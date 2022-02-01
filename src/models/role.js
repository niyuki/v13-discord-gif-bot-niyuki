const mongoose = require('mongoose');
let otzubirStat = new mongoose.Schema({
    User: String,
    Role: String,
    Time: Number
})

module.exports = mongoose.model('UserRole', otzubirStat)