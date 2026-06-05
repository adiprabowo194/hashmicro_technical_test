const User = require('../models/User');
const bcrypt = require("bcryptjs");

exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.render("users/index", {
            user: req.session.user,
            users,
            title: "User Management",
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.create = async (req, res) => {
    res.render(
        "users/create",
        {
            title: "Create User"
        }
    );
};

exports.store = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            age,
            salary,
            department,
            role,
            phone
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("users/create",
                {
                    error: "Email already exists",
                }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            phone,
            salary,
            department,
            role,
        });
        return res.redirect("/users");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
};

exports.edit = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.redirect(
                "/users"
            );
        }
        res.render(
            "users/edit",
            {
                targetUser: user
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const {
            name,
            email,
            age,
            salary,
            department
        } = req.body;

        await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                age,
                salary,
                department
            }
        );
        res.redirect("/users");

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.destroy = async (req, res) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        );
        res.redirect("/users");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};