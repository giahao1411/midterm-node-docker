const Redis = require("ioredis");

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
    retryStrategy(times) {
        if (times > 10) {
            return null;
        }
        return Math.min(times * 2000, 10000);
    },
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
    setKey();
    getKey();
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

async function setKey() {
    try {
        const result = await redisClient.set("key", "value");
        console.log("Key set successfully:", result);
    } catch (err) {
        console.error("Error setting key:", err);
    }
}

async function getKey() {
    try {
        const result = await redisClient.get("key");
        console.log("Value for key:", result);
    } catch (err) {
        console.error("Error getting key:", err);
    }
}

module.exports = { redisClient };
