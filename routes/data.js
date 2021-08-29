const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const fs = require("fs")
const tokenFile = require('../token.json');


router.use(bodyParser)

// router.get('/quote', (req,res) => {
//     axios({
//         method: 'get',
//         url: `${process.env.dataURL}quotes/?symbols=NSE:NIFTYBANK-INDEX`,
//         headers: {
//             "Authorization": `${process.env.appID}:${token}`
//         }   
//       })
//         .then((response) => {
//           res.status(200).send(response.data.d[0].v)
//         })
//         .catch((e) => {
//             console.log(e)
//             res.status(500).send(e)
//         })
// })

module.exports.historicalData = async (script, timeframe, from, to) => {
    console.log(4);

    var data = { open: [], close: [], high: [], low: [], volume: [], time: [] }
    try {
        const result = await axios.get(`${process.env.dataURL}history/?symbol=${script}&resolution=${timeframe}&date_format=1&range_from=${from}&range_to=${to}&cont_flag=`, {
            headers: {
                "Authorization": `${process.env.appID}:${tokenFile.access_token}`
            }
        });
        result.data.candles.forEach((eachData) => {
            data.time.push(eachData[0])
            data.open.push(eachData[1])
            data.high.push(eachData[2])
            data.low.push(eachData[3])
            data.close.push(eachData[4])
            data.volume.push(eachData[5])
        })
        return data
    } catch (error) {
        console.log('eee', error)
    }
}