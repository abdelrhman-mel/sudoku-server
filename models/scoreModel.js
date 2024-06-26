const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  dif: { type: String, required: false },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
