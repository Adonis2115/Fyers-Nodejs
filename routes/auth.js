const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const Token = require("../models/token")

router.use(bodyParser)

router.get('/token', async (req,res) => {
    try{
        await axios({
            method: 'post',
            url: `${process.env.baseURL}validate-authcode`,
            data:{
                "grant_type":"authorization_code",
                "appIdHash":process.env.appIdHash,
                "code":process.env.auth_code
            }
        })
        .then(async response => {
            const newToken = new Token({
                access_token : response.data.access_token
            })
            try{
             await newToken.save()
             res.status(200).send(response.data.access_token)
            }
            catch(err){
                console.log(err)
                res.status(500).send(err)

            }
        })
    } catch (e){
        console.log(e.response.data.message)
        res.status(500).send(e.response.data.message)
    } 
})

module.exports = router