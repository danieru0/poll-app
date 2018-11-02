module.exports = function(app) {
    let pollsController = require('../controllers/pollsController');
    
    // GET /polls/:id
    app.route('/polls/:id').get(pollsController.findOne);

    // GET /polls
    app.route('/polls').get(pollsController.findAll);

    // POST /polls
    app.route('/polls').post(pollsController.create);

    // PUT /polls/:id
    app.route('/polls').put(pollsController.update);

    // DELETE /polls/:id
    app.route('/polls/:id').delete(pollsController.remove);
}