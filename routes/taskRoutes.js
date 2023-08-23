const express = require("express");
const webhookController = require("../controllers/webhookController");

const router = express.Router();

router.post("/receiveWebhook", webhookController.receiveWebhook);

module.exports = router;
