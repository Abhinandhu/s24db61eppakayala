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


// Animals List
// exports.animal_list = async function(req, res) {
//     try{
//     theanimal = await animal.find();
//     res.send(theanimal);
//     }
//     catch(err){
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//     } 
//    };

exports.animal_list = async function(req, res) {

    try {
        const animals = await animal.find();
        res.render('animal', { title: 'Animal Search Results', results: animals });
    } 
    catch(err){
            res.status(500);
            res.send(`{"error": ${err}}`);
            } 
};


exports.animal_create_post = async function(req, res) {
    console.log(req.body)
    let document = new animal();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"animal_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.type = req.body.type;
    document.age = req.body.age;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    