require("dotenv").config();
const express = require("express");
const cors = require("cors");
const properties = require("./config/db.config")
const db = require ("./config/database");

const app = express();

var whitelist = properties.CORS;
var corsOptions = {
   origin: whitelist
}

db();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//define routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});