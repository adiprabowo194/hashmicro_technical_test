const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/users", userController.index);
router.get("/users/create", userController.create);
router.post("/users/store", userController.store);
router.get("/users/edit/:id", userController.edit);
router.put("/users/update/:id", userController.update);
router.delete("/users/delete/:id", userController.destroy);

module.exports = router;