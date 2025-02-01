import Redis from "ioredis";

const redistClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redistClient.on("connect", () => {
  console.log("Redis connected");
});

export default redistClient;
