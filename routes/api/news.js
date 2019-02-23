var express = require('express');
var router = express.Router();

var NewsController = require('../../controllers/news_controller');

/* GET news. */
router.get('/all', NewsController.getAllNews);

/* CREATE news. */
router.post('/create', NewsController.createNew);

/* PUT news to archived. */
router.put('/:newId/archive', NewsController.archiveNew);

/* GET archived news. */
router.get('/archived', NewsController.getArchivedNews);

/* REMOVE archived news. */
router.delete('/archived/delete/:newId}', NewsController.removeArchivedNew);


module.exports = router;
