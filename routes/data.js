const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const fs = require("fs")

router.use(bodyParser)

var token 
fs.readFile("./token.json", "utf8", async(err, jsonString) => {
  if (err) {
      const token = {
          access_token: ""
      }
      const jsonString = JSON.stringify(token)
      fs.writeFile('./token.json', jsonString, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
      })
      autCodeGenerate()
      return
  }
  token = await JSON.parse(jsonString).access_token
})

// router.get('/historical', (req,res) => {
//     axios({
//         method: 'get',
//         url: `${process.env.dataURL}history/?symbol=${"NSE:SBIN-EQ"}&resolution=${"15"}&date_format=1&range_from=${"2021-08-01"}&range_to=${"2021-08-26"}&cont_flag=`,
//         headers: {
//             "Authorization": `${process.env.appID}:${token}`
//         }   
//       })
//         .then((response) => {
//           res.status(200).send(response.data.candles)
//         })
//         .catch((e) => {
//             console.log(e)
//             res.status(500).send(e)
//         })
// })

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

// module.exports = router

module.exports = {
    historicalData: async function(script,timeframe,from,to){
        var data = { open: [], close: [], high: [], low: [], volume: [], time: [] }
        await axios({
            method: 'get',
            url: `${process.env.dataURL}history/?symbol=${script}&resolution=${timeframe}&date_format=1&range_from=${from}&range_to=${to}&cont_flag=`,
            headers: {
                "Authorization": `${process.env.appID}:${token}`
            }   
          })
            .then((response) => {
                response.data.candles.forEach((eachData) => {
                    data.time.push(eachData[0])
                    data.open.push(eachData[1])
                    data.high.push(eachData[2])
                    data.low.push(eachData[3])
                    data.close.push(eachData[4])
                    data.volume.push(eachData[5])
                })
                return data
            })
            .catch((e) => {
                return e
            })
    }
}