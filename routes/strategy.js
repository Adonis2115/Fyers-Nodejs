const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const data = require('./data')
var talib = require('talib')
const axios = require('axios')
const xyz = require("./data")

// const fs = require("fs")
// const { stringify } = require("querystring")

router.use(bodyParser)

async function rsiStrategy(){
    var market
    xyz.historicalData("NSE:SBIN-EQ","15","2021-08-01","2021-08-26")
    .then((response)=>{
        console.log(response)
        market = response
        console.log(market)
    })
    var rsi = 60
    var timeFrame = 60
    var isClosing = false
    var sl = 200
    var orderType = "BUY"
    var target = 2.5*sl
    var tsl = [1,0.5]
    var stock = "NSE:SBIN-EQ"
    // talib.execute({
    //     name: "ADX",
    //     startIdx: 0,
    //     endIdx: data.close.length - 1,
    //     high: data.high,
    //     low: data.low,
    //     close: data.close,
    //     optInTimePeriod: 9
    // }, function (err, result) {
    
    //     // console.log("ADX Function Results:")
    //     // console.log(result)
    
    // })
}
setTimeout(rsiStrategy, 1500, 'funky')
// rsiStrategy()
module.exports = router