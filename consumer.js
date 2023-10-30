const { kafka } = require('./client.js');

const group = process.argv[2];

async function init() {
    const consumer = kafka.consumer({
        groupId: group,
    });
    consumer.connect();

    await consumer.subscribe({
        topics: ['rider-updates'],
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({
            topic,
            partition,
            message,
            heartbeat,
            pause,
        }) => {
            console.log('oooooooooooooooooooooooooooooo');
            console.log({ group, topic, partition });
            console.log(message.value.toString());
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxx');
        },
    });
}

init();
