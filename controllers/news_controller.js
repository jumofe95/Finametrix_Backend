// loads the model to use it later
var New = require('../models/new');

var mongoose = require('mongoose');

// mongoose compiles a New model
const News = mongoose.model('New');


const getAllNews = (req, res, next) => {
    const sort = {
        date: 1
    };

    // get all news that dont have "archiveDate" attr, sorted by date of creation
    News.find({archiveDate: {$exists: false}}, null, function (err, docs) {
        res.status(200).send(docs);
    }).sort(sort);
};

const createNew = (req, res, next) => {
    // instantiate the class and assign the data to it
    var new_object = new New();

    new_object.title = req.body.title;
    new_object.description = req.body.description;
    new_object.content = req.body.content;
    new_object.author = req.body.author;
    new_object.date = new Date();

    new_object.save(new_object, (err, result) => {
        //return the created new
        res.status(201).send(result);
    });
};

const archiveNew = (req, res, next) => {
    const id = req.params.newId;                    // getting the id from the query param request

    New.findById(id, function (err, result) {       // checking if the passed id exists on a New
        if (result) { //if New exists...
            // Update the given New, setting archiveDate to current date
            News.updateOne(result, {$set: {"archiveDate": new Date()}}, (err, result) => {
                res.status(200).send('New archived successfully');
            });
        } else {
            res.status(404).send("Error: New not found.");
        }
    });

};

const getArchivedNews = (req, res, next) => {
    const sort = {
        archiveDate: 1
    };

    //find News that have archiveDate, sorted by archiveDate
    News.find({archiveDate: {$exists: true}}, null, function (err, docs) {
        res.status(200).send(docs);
    }).sort(sort);
};

const removeNew = (req, res, next) => {
    // getting the requested id by query param
    const id = req.params.newId;

    New.findById(id, function (err, result) { // checking if the passed id exists on a New
        if(result){ // if New exists
            if (result.archiveDate) { // if New is archived
                News.deleteOne(result, (err, result) => {
                    res.status(200).send('Deleted successfully');
                });
            } else {
                res.status(400).send("Error: New is not archived yet.");
            }
        }else{
            res.status(404).send("Error: New not found.");
        }
    });
};

module.exports = {
    getAllNews, createNew, archiveNew, getArchivedNews, removeNew
};