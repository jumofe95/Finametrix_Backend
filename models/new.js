// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');


// Usaremos los esquemas
var Schema = mongoose.Schema;


// Creamos el objeto del esquema y sus atributos
var NewSchema = Schema({
    title: String,
    description: String,
    content: String,
    author: String,
    date: Date,
    archiveDate: Date,
});


// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('New', NewSchema);
