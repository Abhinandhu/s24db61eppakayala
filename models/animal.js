const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
name: String,
Animal_type: String,
age: Number
})
module.exports = mongoose.model("animal",costumeSchema) 