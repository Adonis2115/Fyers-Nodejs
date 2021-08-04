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