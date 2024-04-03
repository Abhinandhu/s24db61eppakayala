// Import the necessary model
var animal = require('../models/animal');

// Controller function to list all animals
exports.animal_list = function(req, res) {
    res.send('NOT IMPLEMENTED: animal list');
};

// Controller function to get details of a specific animal
exports.animal_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: animal detail: ' + req.params.id);
};

// Controller function to create a new animal
exports.animal_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: animal create POST');
};

// Controller function to delete a specific animal
exports.animal_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: animal delete DELETE ' + req.params.id);
};

// Controller function to update details of a specific animal
exports.animal_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: animal update PUT ' + req.params.id);
};