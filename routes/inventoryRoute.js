// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const dataValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));

//Route to build vevhicle management view
router.get("/", utilities.handleErrors(invController.buildVehicleMngmt));

//Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

//Process the add-classification data
router.post(
    "/add-classification",
    dataValidate.classificationRules(),
    dataValidate.checkClassData,
    utilities.handleErrors(invController.addClassificationName))

module.exports = router;










