const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

PollSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Poll', PollSchema);