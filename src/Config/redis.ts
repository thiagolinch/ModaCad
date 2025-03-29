import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: '127.0.0.1', // Endereço do Redis
        port: 6379,        // Porta do Redis
    },
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.error('Failed to connect to Redis:', err);
    });

export default redisClient;