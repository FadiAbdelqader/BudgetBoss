const express = require('express');
const router = express.Router();
const comparatorController = require('../controllers/comparatorController');

// Route pour récupérer les 5 éléments les moins chers d'une région donnée
router.get('/:region', comparatorController.getByRegion);

router.get('/byregion/:region', comparatorController.getCarburantByRegion);

router.get('/allprix/:region/:type_carburant', comparatorController.getAllPrixCarburant);

router.get('/prix/:region/:type_carburant', comparatorController.getPrixCarburant);

module.exports = router;
