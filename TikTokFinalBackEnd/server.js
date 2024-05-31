const express = require('express');
const mongoose = require('mongoose');
const redisClient = require('./redis');
const cors = require('cors');
const watchTimeRoutes = require('./routes/watchTime');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', watchTimeRoutes);

const mongoURL = process.env.MONGO_URL || 'mongodb://mongodb:27017/tiktokclone';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
