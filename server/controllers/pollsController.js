const Poll = require('../models/poll');

module.exports = {
    findOne: function(req, res) {
        Poll.findOne({ title: req.params.id }).then(poll => {
            if (poll) {
                res.status(200).send({data: poll});
            } else {
                res.status(404).send({'404': 'Not found!'});
            }
        });
    },

    findAll: function(req, res) {
        Poll.find().then(poll => {
            return res.status(200).send({ data: poll });
        });
    },

    create: function(req, res) {
        Poll.create({
            title: req.body.title,
            pollOptions: req.body.pollOptions,
            uniqueID: req.body.uniqueID
        }, (err, poll) => {
            if (err) throw err;
            return res.status(201).send({ data: poll, message: 'Poll has been created.' });
        });
    },

    update: function(req, res) {
        Poll.findOne({ title: req.params.id }).then(poll => {
            if (poll) {
                
            }
        });
    },

    remove: function(req, res) {

    }
}