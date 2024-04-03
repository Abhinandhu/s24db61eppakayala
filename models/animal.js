const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
name: String,
type: String,
age: Number
})
module.exports = mongoose.model("animal",animalSchema) 