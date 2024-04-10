// Import the necessary model
var animal = require('../models/animal');

// Controller function to list all animals
exports.animal_list = function (req, res) {
    res.send('NOT IMPLEMENTED: animal list');
};

// Controller function to get details of a specific animal
exports.animal_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: animal detail: ' + req.params.id);
};

// Controller function to create a new animal
exports.animal_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: animal create POST');
};

// Controller function to delete a specific animal
exports.animal_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: animal delete DELETE ' + req.params.id);
};

// Controller function to update details of a specific animal
exports.animal_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: animal update PUT ' + req.params.id);
};


// Animals List
exports.animal_list = async function(req, res) {
    try{
    theanimal = await animal.find();
    res.send(theanimal);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };

exports.animal_view_all_Page = async function (req, res) {

    try {
        animals = await animal.find();
        res.render('animal', { title: 'Animal Search Results', results: animals });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle animal create on POST.
exports.animal_create_post = async function (req, res) {
    console.log(req.body)
    let document = new animal();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"animal_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.type = req.body.type;
    document.age = req.body.age;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.animal_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await animal.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   }


exports.animal_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await animal.findById(req.params.id)
        // Do updates of properties
        if (req.body.animal_type)
            toUpdate.animal_type = req.body.animal_type;
        if (req.body.animal_size) toUpdate.animal_size = req.body.animal_size;
        if (req.body.animal_price) toUpdate.animal_price = req.body.animal_price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
        failed`);
    }
};

exports.animal_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await animal.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
// Handle a show one view with id specified by query
exports.animal_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await animal.findById( req.query.id)
    res.render('animaldetail',
    { title: 'animal Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };