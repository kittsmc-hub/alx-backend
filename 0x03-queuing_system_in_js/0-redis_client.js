import redis from 'redis';

async function main() {
  const client = redis.createClient();

  client.on('connect', () => {
    console.log('Redis client connected to the server');
    client.quit(); 
  });

  client.on('error', (error) => {
    console.error(`Redis client not connected to the server: ${error.message}`);
    client.quit(); 
  });

  await new Promise((resolve) => {
    client.on('end', () => {
      console.log('Redis client connection closed');
      resolve();
    });
  });
}

main().catch((error) => {
  console.error('An error occurred:', error);
});

