require("dotenv").config();

const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");

const connectDB = require("./src/config/db");

const app = express();

// Connect Database
connectDB();

// View Engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.currentUrl = req.path;
    next();
});

const dashboardRoutes = require("./src/routes/dashboardRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require('./src/routes/userRoutes');
const similarityRoutes = require('./src/routes/similarityRoutes');

// Routes
app.use(require("./src/routes/authRoutes"));

// Default Route
app.get("/", (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }
    res.redirect("/login");
});


app.use(dashboardRoutes);
app.use(userRoutes);
app.use(similarityRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});