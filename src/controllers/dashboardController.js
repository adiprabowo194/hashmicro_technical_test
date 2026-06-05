const User = require("../models/User");
const { greetingUser } = require("../utils/additionalFunc");
exports.index = async (req, res) => {
    const users = await User.find();
    const totalUsers = users.length;
    const salaries = users.map(user => Number(user.salary) || 0);
    const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0);

    const greeting = greetingUser(req.session.user);
    const averageSalary = totalUsers > 0 ? Math.round(totalSalary / totalUsers) : 0;
    const highestSalary = salaries.length > 0 ? Math.max(...salaries) : 0;
    const lowestSalary = salaries.length > 0 ? Math.min(...salaries) : 0;

    res.render("dashboard/index", {
        user: req.session.user,
        totalUsers,
        averageSalary,
        highestSalary,
        lowestSalary,
        greeting
    });
};