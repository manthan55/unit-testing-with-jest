import dotenv from "dotenv";
dotenv.config();

import Configuration from "../../Configuration";
import RabbitMQ from "./RabbitMQ";

let rabbitMQ: RabbitMQ;

describe("RabbitMQ Test", () => {
  beforeEach(() => {
    rabbitMQ = new RabbitMQ();
  });

  afterEach(() => {
    // Closing connection as jest throws open handles error otherwise.
    rabbitMQ.CloseConnection();
  });

  it("Initialize() should throw error with wrong AMQP_HOST", async () => {
    // Intentionally changing the AMQP_HOST config value so as to trigger error in Connect method
    const wrongHost = "some_wrong_amqp_host"
    Configuration.AMQP_HOST = wrongHost;

    await expect(async () => {await rabbitMQ.Initialize()}).rejects.toThrow(`getaddrinfo ENOTFOUND ${wrongHost}`);
  });

  it("Initialize() should throw error with wrong AMQP_PASS", async () => {
    // Intentionally changing the AMQP_PASS config value so as to trigger error in Connect method
    const wrongPass = "some_wrong_amqp_pass"
    Configuration.AMQP_PASS = wrongPass;

    await expect(async () => {await rabbitMQ.Initialize()}).rejects.toThrow('Handshake terminated by server: 403 (ACCESS-REFUSED) with message "ACCESS_REFUSED - Login was refused using authentication mechanism PLAIN. For details see the broker logfile.');
  });
});
