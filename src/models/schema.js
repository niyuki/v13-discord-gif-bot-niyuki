const mongoose = require('mongoose');
let otzubirStat = new mongoose.Schema({
    User: String,
    Gif: {type: Number, default: 0},
    Pp: {type: Number, default: 0},
    Total: {type: Number, default: 0},
    Coins: {type: Number, default: 0}
})

module.exports = mongoose.model('Userstat', otzubirStat)