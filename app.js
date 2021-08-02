const express = require("express")
const app = express()
const dotenv = require('dotenv')
const mongoose = require("mongoose");

dotenv.config();

//connection to db
mongoose.set("useFindAndModify", false)
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
app.listen(process.env.port, () => console.log(`Server Up and running at ${process.env.port}`));
});

module.exports = app