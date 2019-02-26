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
    var sort = {
        date: 1
    };
    const collection = db.collection('news');
    // Find all news
    collection.find({archiveDate : {$exists:false}}).sort(sort).toArray((err, result) => {
        assert.equal(err, null);

        res.status(200).send(result);
    });
};

const createNew = (req, res, next) => {
    var new_object = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };

    const collection = db.collection('news');
    collection.save(new_object, (err, result) => {
        if (err) return console.log(err);

        res.status(201).send(result.ops[0]); //return the created new for displaying on screen (if required)
    });
};

const archiveNew = (req, res, next) => {
    const id = req.params.newId;
    var ObjectId = require('mongodb').ObjectID;

    const collection = db.collection('news');
    // Update new with given id, set archiveDate to current date
    collection.updateOne({"_id": new ObjectId(id)}, {$set: {"archiveDate": new Date()}}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);

        res.status(200).send('New archived successfully');
    });
};

const getArchivedNews = (req, res, next) => {
    var sort = {
        archiveDate: 1
    };
    const collection = db.collection('news');
    collection.find({archiveDate : {$exists:true}}).sort(sort).toArray((err, docs) => {
        assert.equal(err, null);
        res.status(200).send(docs);
    });
};

const removeNew = (req, res, next) => {
    const id = req.params.newId;
    var ObjectId = require('mongodb').ObjectID;

    const collection = db.collection('news');
    collection.deleteOne({ "_id": new ObjectId(id)}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);

        res.status(204).send();
    });
};


module.exports = {
    getAllNews, createNew, archiveNew, getArchivedNews, removeNew
};