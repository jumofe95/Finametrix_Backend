// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');


// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');


// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var port = 3000;


// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;


const mongodb_url = 'mongodb+srv://julian:wodyjuli95@news-35sq7.mongodb.net/news_db?retryWrites=true';
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect(mongodb_url)
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos  se ha realizado correctamente");

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(port, () => {
            console.log("servidor corriendo en http://localhost:3000");
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));
