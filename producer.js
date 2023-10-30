const { read } = require('fs');
const { kafka } = require('./client.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt('> ');
rl.on('line', async (line) => {
    const [rider, location] = line.split(' ');

    await producer.send({
        topic: 'rider-updates',
        messages: [
            {
                partition: location?.toLowerCase() === 'north' ? 0 : 1,
                key: 'location-update',
                value: JSON.stringify({
                    name: rider,
                    location: location,
                }),
            },
        ],
    });
    rl.prompt();
}).on('close', async () => {
    await producer.disconnect();
});

async function init() {
    producer = kafka.producer();
    console.log('connecting producer');
    await producer.connect();
    console.log('producer connect ok');
    rl.prompt();
}
init();
