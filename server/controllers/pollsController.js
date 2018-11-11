const Poll = require('../models/poll');

module.exports = {
    findOne: function(req, res) {
        Poll.findOne({ uniqueID: req.params.id }).then(poll => {
            if (poll) {
                res.status(200).send({data: poll});
            } else {
                res.status(404).send({errorMessage: 'Not found!'});
            }
        });
    },

    findAll: function(req, res) {
        let isTrue = req.query.sort === 'true';
        const options = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit) || null,
            sort: { date: isTrue ? 1 : -1}
        }
        Poll.paginate({}, options, function(err, result) {
            if (err) throw err;
            return res.status(200).send({ data: result.docs });
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
        Poll.updateOne(
            { 'uniqueID': req.params.id, 'pollOptions.text': req.body.clickedOption },
            { '$inc': { 'pollOptions.$.votes': 1 }},
            (err) => {
                if (err) throw err;
                Poll.updateOne(
                    { 'uniqueID': req.params.id},
                    { '$push': { ips: {'clientIP': req.body.clientIP} }},
                    (err, poll) => {
                        if (err) throw err;
                        return res.status(201).send({ data: poll, message: 'Poll has been updated.' });
                    }
                )
            }
        )
    }
}