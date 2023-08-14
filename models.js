const mongoose = require('mongoose')
//define a schema
const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
});
//create a model 
const Student = mongoose.model('Student',studentSchema);
module.exports = {Student};