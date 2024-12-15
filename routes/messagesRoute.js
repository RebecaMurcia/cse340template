// Needed Resources
const express = require("express");
const router = new express.Router();

const messagesController = require("../controllers/messagesController");
const messagesValidation = require("../utilities/messages-validation");
const utilities = require("../utilities");

router.use(["/view/:messageId", "/compose", "/compose/:messageId", "/send", "/archive", "/view/:messageId/delete", "/delete", "/view/:messageId/toggle-read", "/view/:messageId/toggle-archived"], utilities.checkLogin);

router.get("/", utilities.checkLogin, utilities.handleErrors(messagesController.buildInbox));

// Route to build message view view
router.get("/view/:messageId", 
utilities.handleErrors(messagesController.buildMessageView));

// Route to build compose messages view
router.get("/compose", 
utilities.handleErrors(messagesController.buildCompose));
router.get("/compose/:messageId", 
utilities.handleErrors(messagesController.buildCompose));
router.post("/send", messagesValidation.sendMessageRules(), 
messagesValidation.checkMessageData, 
utilities.handleErrors(messagesController.sendMessage))

// Rout to build archived messages view
router.get("/archive", 
utilities.handleErrors(messagesController.buildArchive));

// Route to build delete message confirmation view
router.get("/view/:messageId/delete", 
utilities.handleErrors(messagesController.buildDelete));
router.post("/delete", utilities.handleErrors(messagesController.deleteMessage));


//API calls
router.get("/view/:messageId/toggle-read", 
utilities.handleErrors(messagesController.toggleRead));
router.get("/view/:messageId/toggle-archived", 
utilities.handleErrors(messagesController.toggleArchived));

module.exports = router;