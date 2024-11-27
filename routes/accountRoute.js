//Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
  
  //Deliver login view
  router.get("/login", utilities.handleErrors(accountController.buildLogin))

   //Deliver registration view
   router.get("/register", utilities.handleErrors(accountController.buildRegister))

   //POST router registration view
   router.post('/register', utilities.handleErrors(accountController.registerAccount))


module.exports = router;