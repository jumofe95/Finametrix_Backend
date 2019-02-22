var express = require('express');
var router = express.Router();

/* GET news. */
router.get('/all', function(req, res, next) {
    console.log(req);

});

/* CREATE news. */
router.post('/create', function(req, res, next) {
  console.log(req.body);
});

/* PUT news to archived. */
router.put('/archive/{new_id}', function(req, res, next) {

});

/* GET archived news. */
router.get('/archived', function(req, res, next) {

});

/* REMOVE archived news. */
router.delete('/archived/delete/{new_id}', function(req, res, next) {

});



module.exports = router;
