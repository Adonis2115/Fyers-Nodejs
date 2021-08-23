const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const fs = require("fs")
const { Console } = require("console")

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

router.get('/profile', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}profile`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.data)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/funds', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}funds`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.fund_limit)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/holdings', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}holdings`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.holdings)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/positions', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}positions`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.netPositions)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/pnl', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}positions`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.overall)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/orders', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}orders`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.orderBook)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

router.get('/tradebook', (req,res) => {
    axios({
        method: 'get',
        url: `${process.env.baseURL}tradebook`,
        headers: {
            "Authorization": `${process.env.appID}:${token}`
        }   
      })
        .then((response) => {
          res.status(200).send(response.data.tradebook)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
})

module.exports = router