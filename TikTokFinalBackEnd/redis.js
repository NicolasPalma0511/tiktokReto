const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'redis-17139.c16.us-east-1-2.ec2.redns.redis-cloud.com',
  port: 17139, 
  password: 'e0vXjhAeYmiKGqHkzIbciGJEteDcZjRm', 
});

module.exports = redisClient;
