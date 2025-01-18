const { kafka } = require("./client");

async function initialise() {
  const admin = kafka.admin();
  console.log("Admin Connecting...");
  await admin.connect();
  console.log("Admin Connection Success...");

  console.log("Creating Topic...");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Creation Success [rider-updates]");

  console.log("Disconnecting Admin");
  await admin.disconnect();
}

initialise();
