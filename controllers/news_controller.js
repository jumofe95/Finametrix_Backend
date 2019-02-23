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


function formattedCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}


const archiveNew = (req, res, next) => {
    const collection = db.collection('news');
    const new_id = req.params.newId;
    const currentDate = formattedCurrentDate();

    // Update document where a is 2, set b equal to 1
    collection.updateOne({id: new_id}, {$set: {archiveDate: currentDate}}, (err, result) => { //TODO: END QUERY
            assert.equal(err, null);
            assert.equal(1, result.result.n);

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