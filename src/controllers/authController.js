const User = require("../models/User");

const bcrypt = require("bcryptjs");

exports.loginPage =
    (req, res) => {
        res.render("auth/login");
    };

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const totalUser = await User.countDocuments();
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("auth/login", {
                error: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!user || !isMatch) {
            return res.render("auth/login", {
                error: "Invalid email or password",
            });
        }
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error logging in");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Error logging out");
        }
        res.clearCookie("connect.sid");
        return res.redirect("/login");
    });
};