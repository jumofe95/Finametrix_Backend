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
    // Find all news
    db.collection('news').find({}).toArray((err, docs) => {
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
    const id = req.params.newId;
    var ObjectId = require('mongodb').ObjectID;

    // Update new with given id, set archiveDate to current date
    db.collection('news').updateOne({"_id": new ObjectId(id)}, {$set: {"archiveDate": new Date()}}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);

        res.status(200).send('New archived successfully!!');
    });
};


const getArchivedNews = (req, res, next) => {
    var sort = {
        archiveDate: 1
    };
    db.collection('news').find({archiveDate : {$exists:true}}).sort(sort).toArray((err, docs) => {
        assert.equal(err, null);
        res.status(200).send(docs);
    });
};


const removeArchivedNew = (req, res, next) => {

};


module.exports = {
    getAllNews, createNew, archiveNew, getArchivedNews, removeArchivedNew
};