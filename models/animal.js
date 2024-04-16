// const mongoose = require("mongoose")
// const animalSchema = mongoose.Schema({
// name: String,
// type: String,
// age: Number
// })
// module.exports = mongoose.model("animal",animalSchema) 

const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  type: String,
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 1000
  }
});

module.exports = mongoose.model("Animal", animalSchema);
