const { kafka } = require('./client.js');

async function init() {
    const admin = kafka.admin();
    console.log('admin connectiing...');
    admin.connect();
    console.log('admin connect ok');

    console.log('creating topics');
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
            },
        ],
    });
    console.log('topic created successfully [rider-updates]');
    console.log('disconnecting admin');
    await admin.disconnect();
}

init();
