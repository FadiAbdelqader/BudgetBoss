const express = require('express');
const router = express.Router();
const comparatorController = require('../controllers/comparatorController');

// Route pour récupérer les 5 éléments les moins chers d'une région donnée
router.get('/comparator/:region', comparatorController.getByRegion);

router.get('/comparator/carburants/byregion/:region', comparatorController.getCarburantByRegion);

router.get('/comparator/carburants/allprix/:region/:type_carburant', comparatorController.getAllPrixCarburant);

router.get('/comparator/carburants/prix/:region/:type_carburant', comparatorController.getPrixCarburant);

module.exports = router;
