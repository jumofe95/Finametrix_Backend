// ---- MongoDB connection ----
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const mongodb_url_short = 'mongodb+srv://julian:wodyjuli95@news-35sq7.mongodb.net/test?retryWrites=true';

// Database Name
const dbName = 'news';
var db;

// Connect to the server
MongoClient.connect(mongodb_url_short, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
    //client.close();
});
// ---- / MongoDB connection ----


const getAllNews = (req, res, next) => {
    // Get the news collection
    const collection = db.collection('news');

    // Find all news
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        res.status(200).send(docs);
    });
};


const createNew = (req, res, next) => {
    db.collection('news').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.status(200).send('Created successfully!!');
    });
};


const archiveNew = (req, res, next) => {
    const collection = db.collection('news');
    const new_id = req.params.newId;

    // Update document where a is 2, set b equal to 1
    collection.updateOne({id: new_id}, {$set: {b: 1}}, (err, result) => { //TODO: END QUERY
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            res.status(200).send('New archived successfully!!');
        });

};


const getArchivedNews = (req, res, next) => {

};


const removeArchivedNew = (req, res, next) => {

};


module.exports = {
    getAllNews, createNew, archiveNew, getArchivedNews, removeArchivedNew
};