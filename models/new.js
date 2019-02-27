// load the mongoose module
var mongoose =  require('mongoose');

// We will use the schemes
var Schema = mongoose.Schema;

// We create the object and its attributes
var NewSchema = Schema({
    title: String,
    description: String,
    content: String,
    author: String,
    date: Date,
    archiveDate: Date,
});


// export the model for use in other files
module.exports = mongoose.model('New', NewSchema);
