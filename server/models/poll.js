const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: String,
    uniqueID: String,
    date: {type: Date, default: Date.now},
    pollOptions: [{
        text: String,
        votes: Number
    }],
    ips: [{
        clientIP: String
    }]
});

module.exports = mongoose.model('Poll', PollSchema);