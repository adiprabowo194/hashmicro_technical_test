const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.loginPage, (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }
    res.render("auth/login", { error: null });
});
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

module.exports = router;