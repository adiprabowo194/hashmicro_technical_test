const express = require("express");
const router = express.Router();

const similarityController = require("../controllers/similarityController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/similarity", similarityController.index);
router.post("/similarity", similarityController.check);

module.exports = router;