const { kafka } = require("./client");

const group = process.argv[2];

if (!group) {
  console.error("Error: Please provide a consumer group ID as an argument.");
  process.exit(1);
}

async function initialise() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({
    topic: "rider-updates",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART: [${partition}]: ${
          message.key
        } - ${message.value.toString()}`
      );
    },
  });
}

initialise();
