const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    brokers: ['192.168.2.212:9092'],
    clientId: 'kafka-ps',
});
