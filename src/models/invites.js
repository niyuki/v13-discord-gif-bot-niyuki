const mongoose = require("mongoose");

const invite = new mongoose.Schema({
  userID: String,
  inviterID: String,
  IsFake: { type: Boolean, default: false },
  Regular: { type: Number, default: 0 },
  Fake: { type: Number, default: 0 },
  Bonus: { type: Number, default: 0 },
  Leave: { type: Number, default: 0 }
});

module.exports = mongoose.model("Invites", invite);