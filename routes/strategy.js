const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const data = require('./data')
var talib = require('talib')
const axios = require('axios')
const xyz = require("./data")

// router.use(bodyParser)

async function rsiStrategy(){
    var market
    xyz.historicalData("NSE:SBIN-EQ","15","2021-08-01","2021-08-26")
    .then(response => {
        market = response
        var rsi = 60
        var timeFrame = 60
        var isClosing = false
        var sl = 200
        var orderType = "BUY"
        var target = 2.5*sl
        var tsl = [1,0.5]
        var stock = "NSE:SBIN-EQ"
        talib.execute({
            name: "ADX",
            startIdx: 0,
            endIdx: market.close.length - 1,
            high: market.high,
            low: market.low,
            close: market.close,
            optInTimePeriod: 9
        }, function (err, result) {
            console.log("ADX Function Results:")
            console.log(result)
    
        })
    })
}

rsiStrategy()
module.exports = router