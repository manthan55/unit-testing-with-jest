import * as Amqp from "amqplib/callback_api";
import Configuration from "../../Configuration";

export default class RabbitMQ {
  private connection: Amqp.Connection;
  private channel: Amqp.Channel;

  async Initialize(): Promise<Amqp.Channel> {
    console.log("Initializing RabbitMQ");

    try {
      this.channel = await this.Connect();
      return this.channel;
    } catch (err) {
      console.log("Error caught in Initialize()")
      throw err;
    }
  }

  private async Connect(): Promise<Amqp.Channel> {
    return new Promise((resolve, reject) => {
      Amqp.connect(
        `${Configuration.AMQP_PROTOCOL}://${Configuration.AMQP_USER}:${Configuration.AMQP_PASS}@${Configuration.AMQP_HOST}/${Configuration.AMQP_USER}?heartbeat=60`,
        (err, conn) => {
          if (err) {
            console.log("Error originated in Connect()")
            reject(err);
            return;
          }

          conn.on("error", function (err: Error) {
            if (err.message !== "Connection closing") {
              reject(err);
              return;
            }
          });
          conn.on("close", () => {
            console.log("[AMQP] reconnecting");
            // setTimeout(() => {this.Initialize()}, 1000);
          });
          this.connection = conn;
          resolve(this.CreateChannel(this.connection));
        }
      );
    });
  }

  private async CreateChannel(connection: Amqp.Connection): Promise<Amqp.Channel> {
    console.log("Creating channel");
    return new Promise((resolve, reject) => {
      try {
        connection.createChannel((err, channel) => {
          if (err) {
            reject(err);
            return;
          }
          channel.assertQueue(Configuration.QUEUE, {
            durable: true,
          });

          resolve(channel);
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  CloseConnection() {
    this.connection?.close();
  }
}
