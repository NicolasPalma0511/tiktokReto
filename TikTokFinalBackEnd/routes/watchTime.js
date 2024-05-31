const express = require('express');
const router = express.Router();
const WatchTime = require('../models/WatchTime');
const redisClient = require('../redis');

router.get('/watchtimes', async (req, res) => {
  try {
    const watchTimes = await WatchTime.find();
    res.status(200).json(watchTimes);
  } catch (error) {
    console.error("Error fetching watch times:", error);
    res.status(500).json({ message: "Error fetching watch times" });
  }
});

router.post('/watchtime', async (req, res) => {
  const { userId, videoId, timeSpent } = req.body;

  console.log("Received request:", req.body); 

  try {
    const cacheKey = `${userId}:${videoId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Data found in Redis cache:", cachedData);

      let parsedData;
      try {
        parsedData = JSON.parse(cachedData);
      } catch (parseError) {
        console.error("Error parsing cached data:", parseError, "Cached data:", cachedData);
        res.status(500).send({ message: "Error parsing cached data" });
        return;
      }

      const updatedWatchTime = await WatchTime.findOneAndUpdate(
        { userId, videoId },
        { $inc: { timeSpent: timeSpent } }, 
        { new: true, upsert: true }
      );

      await redisClient.set(cacheKey, JSON.stringify(updatedWatchTime), 'EX', 3600);

      res.status(200).send(updatedWatchTime);
    } else {
      const newWatchTime = new WatchTime({ userId, videoId, timeSpent });
      await newWatchTime.save();
      console.log("Data saved:", newWatchTime);

      await redisClient.set(cacheKey, JSON.stringify(newWatchTime), 'EX', 3600);

      res.status(201).send(newWatchTime);
    }
  } catch (error) {
    console.error("Error saving/watching watch time:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
