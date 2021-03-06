export default {
  AMQP_PROTOCOL: process.env.AMQP_PROTOCOL ?? "",
  AMQP_HOST: process.env.AMQP_HOST ?? "",
  AMQP_USER: process.env.AMQP_USER ?? "",
  AMQP_PASS: process.env.AMQP_PASS ?? "",
  QUEUE: process.env.QUEUE ?? "",
};
