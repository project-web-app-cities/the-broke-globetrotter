// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//require('./config/session.config')(app);

const capitalize = require("./utils/capitalize");
const projectName = "myproject";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use( (req, res, next) => {
    app.locals.userDetails = req.session.loggedUser; 
    next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// const cityRoutes = require("./routes/city.routes");
// app.use("/", cityRoutes);


const freeStuffRoutes = require("./routes/freeStuff.routes");
app.use("/", freeStuffRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
