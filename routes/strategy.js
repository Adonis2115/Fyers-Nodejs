const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
var talib = require('talib')
// const axios = require('axios')
// const fs = require("fs")
// const { stringify } = require("querystring")

router.use(bodyParser)

console.log("TALib Version: " + talib.version)
var functions = talib.functions
for (i in functions) {
	console.log(functions[i].name)
}

module.exports = router