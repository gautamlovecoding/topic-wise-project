const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function initialise() {
  const producer = kafka.producer();
  console.log("Producer Connecting...");
  await producer.connect();
  console.log("Producer Connection Success...");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, riderLocation] = line.split(" ");
    console.log("🚀⚡👨‍💻🚀 ~ rl.on ~ riderName, riderLocation🚀🔥🚀➢", riderName, riderLocation)
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: riderLocation.toLowerCase() == "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({
            name: riderName,
            riderLocation,
          }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

initialise();
