const mongoose = require('mongoose');

const watchTimeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  },
});

const WatchTime = mongoose.model('WatchTime', watchTimeSchema);

module.exports = WatchTime;
