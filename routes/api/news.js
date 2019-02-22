var express = require('express');
var router = express.Router();


// --- MongoDB connection ---
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const mongodb_url_short = 'mongodb+srv://julian:wodyjuli95@news-35sq7.mongodb.net/test?retryWrites=true';

// Database Name
const dbName = 'news';
var db;

// Connect to the server
MongoClient.connect(mongodb_url_short, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
    //client.close();
});




/* GET news. */
router.get('/all', function (req, res, next) {
    // Get the documents collection
    const collection = db.collection('news');
    collection.toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);

    });

});

/* CREATE news. */
router.post('/create', function (req, res, next) {
    console.log(req.body);

    db.collection('news').save(req.body, function (err, result) {
        if (err) return console.log(err);

        console.log('saved to database');
        res.status(200).send('Created successfully!!');
    })

});

/* PUT news to archived. */
router.put('/archive/{new_id}', function (req, res, next) {

});

/* GET archived news. */
router.get('/archived', function (req, res, next) {

});

/* REMOVE archived news. */
router.delete('/archived/delete/{new_id}', function (req, res, next) {

});


module.exports = router;
