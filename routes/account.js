const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const Token = require("../models/token")

router.use(bodyParser)

var token

Token.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, res) {
    token = res.access_token
})

router.get('/profile', (req,res) => {
    axios({
        method: 'get',
        url: 'https://api.fyers.in/api/v2/profile',
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
        url: 'https://api.fyers.in/api/v2/funds',
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
        url: 'https://api.fyers.in/api/v2/holdings',
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
        url: 'https://api.fyers.in/api/v2/positions',
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
        url: 'https://api.fyers.in/api/v2/positions',
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
        url: 'https://api.fyers.in/api/v2/orders',
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
        url: 'https://api.fyers.in/api/v2/tradebook',
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