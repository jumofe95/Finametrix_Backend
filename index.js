// load the mongoose module to connect to MongoDB
var mongoose = require('mongoose');

// load the app.js file with the Express configuration
var app = require('./app');

// create the PORT variable to indicate the port on which the server will work
var port = 3000;

const mongodb_url = 'mongodb+srv://julian:wodyjuli95@news-35sq7.mongodb.net/news_db?retryWrites=true';
// We use the connect method to connect to our database
mongoose.connect(mongodb_url)
    .then(() => {
        // When the connection is made, we launch this message by console
        console.log("Connection with DB correctly");

        // CREATE THE WEB SERVER WITH NODEJS
        app.listen(port, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    // If it does not connect correctly, we show the error
    .catch(err => console.log(err));
