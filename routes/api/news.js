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
// --- / MongoDB connection ---





/* GET news. */
router.get('/all', function (req, res, next) {
    // Get the news collection
    const collection = db.collection('news');

    // Find all news
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.status(200).send(docs);
    });
});

/* CREATE news. */
router.post('/create', function (req, res, next) {
    db.collection('news').save(req.body, function (err, result) {
        if (err) return console.log(err);
        res.status(200).send('Created successfully!!');
    });

});

/* PUT news to archived. */
router.put('/archive/:newId', function (req, res, next) {
    res.send("newId is: " + req.params.newId);
});

/* GET archived news. */
router.get('/archived', function (req, res, next) {

});

/* REMOVE archived news. */
router.delete('/archived/delete/:newId}', function (req, res, next) {

});


module.exports = router;
