
This repo serves as testing ground for the Stack Overflow question [here](https://stackoverflow.com/questions/66506510/testing-rabbitmq-connection-code-with-jest-results-in-weird-unsynchronized-out)

## Setup

1.  **Restore dependencies**

    ```shell
    npm install
    ```

2.  **Create .env**

    Create a .env file at the root with the following values.

    ```shell
    # .env
    AMQP_PROTOCOL=
    AMQP_HOST=
    AMQP_USER=
    AMQP_PASS=
    QUEUE="MyQueue"
    ```

    You can get a testing RabbitMQ server from [CloudAMQP](https://www.cloudamqp.com/)

3.  **Running Tests**
    
    You can follow each scenario mentioned in the StackOverflow question by commenting out each test and running the tests with the below command.
    
    ```shell
    jest src/Services/RabbitMQ/RabbitMQ.test.ts

    # OR

    npm test
    ```

I appreciate you taking your time and testing out this repo to help me solve the issue. Thanks 😃