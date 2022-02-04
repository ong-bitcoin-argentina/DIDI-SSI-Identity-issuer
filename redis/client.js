/* eslint-disable no-console */
const redis = require('redis');

// Crea un nuevo cliente Redis
// Si no se establece REDIS_HOST, el host predeterminado es localhost
// Si no se establece REDIS_PORT, el puerto predeterminado es 6379
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

// Establece la clave "octocat" para un valor de "Mona the octocat"
redisClient.set('octocat', 'Mona the Octocat', redis.print);
// Establece una clave "octocat", campo para "species" y "value" para "Cat and Octopus"
redisClient.hset('species', 'octocat', 'Cat and Octopus', redis.print);
// Establece una clave para "octocat", campo para "species" y "value" para "Dinosaur and Octopus"
redisClient.hset('species', 'dinotocat', 'Dinosaur and Octopus', redis.print);
// Establece una clave para "octocat", campo para "species" y "value" para "Cat and Robot"
redisClient.hset(['species', 'robotocat', 'Cat and Robot'], redis.print);
// Obtiene todos los campos en la clave "species"

redisClient.hkeys('species', (err, replies) => {
  console.log(`${replies.length} replies:`);
  replies.forEach((reply, i) => {
    console.log(`    ${i}: ${reply}`);
  });
  redisClient.quit();
});
