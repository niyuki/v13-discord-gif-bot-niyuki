const mongoose = require('mongoose');
let otzubirStat = new mongoose.Schema({
    channelid: String,
    msgid: String,
})

module.exports = mongoose.model('Editmsg', otzubirStat)