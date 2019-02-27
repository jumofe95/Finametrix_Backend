// Cargamos el modelo para usarlo posteriormente
var New = require('../models/new');

var mongoose = require('mongoose');


const getAllNews = (req, res, next) => {
    const sort = {
        date: 1
    };
    const News = mongoose.model('New');

    News.find({archiveDate: {$exists: false}}, null, function (err, docs) {
        res.status(200).send(docs);
    }).sort(sort);
};

const createNew = (req, res, next) => {
    var new_object = new New();
    new_object.title = req.body.title;
    new_object.description = req.body.description;
    new_object.content = req.body.content;
    new_object.author = req.body.author;
    new_object.date = new Date();

    //const collection = db.collection('news');
    new_object.save(new_object, (err, result) => {
        res.status(201).send(result); //return the created new for displaying on screen (if required)
    });
};

const archiveNew = (req, res, next) => {
    const id = req.params.newId;
    const ObjectId = require('mongodb').ObjectID;
    const News = mongoose.model('New');

    // Update new with given id, set archiveDate to current date
    News.updateOne({"_id": new ObjectId(id)}, {$set: {"archiveDate": new Date()}}, (err, result) => {
        res.status(200).send('New archived successfully');
    });
};

const getArchivedNews = (req, res, next) => {
    const sort = {
        archiveDate: 1
    };

    const News = mongoose.model('New');
    News.find({archiveDate: {$exists: true}}, null, function (err, docs) {
        res.status(200).send(docs);
    }).sort(sort);
};

const removeNew = (req, res, next) => {
    const id = req.params.newId;
    const ObjectId = require('mongodb').ObjectID;
    const News = mongoose.model('New');

    News.deleteOne({"_id": new ObjectId(id)}, (err, result) => {
        res.status(204).send();
    });
};


module.exports = {
    getAllNews, createNew, archiveNew, getArchivedNews, removeNew
};