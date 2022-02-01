const mongoose = require('mongoose');

let afk = new mongoose.Schema({
    guild: String,
    user: String,
    reason: String
})

module.exports = mongoose.model('afk', afk)