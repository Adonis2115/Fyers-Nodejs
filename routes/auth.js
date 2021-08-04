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
            url: 'https://api.fyers.in/api/v2/validate-authcode',
            data:{
                "grant_type":"authorization_code",
                "appIdHash":"18a78d33d5bf2f77056283bd73656a57766c04e051f09703aeeb6dfd661dfe52",
                "code":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE2MjgwODIzODUsImV4cCI6MTYyODA4MjY4NSwibmJmIjoxNjI4MDgyMzg1LCJhdWQiOiJbXCJ4OjJcIiwgXCJkOjJcIiwgXCJkOjFcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJYSDAwNTYyIiwibm9uY2UiOiIiLCJhcHBfaWQiOiJJWjhDRUxQT0pOIiwidXVpZCI6IjdmYzE5Y2UyMjMwMTQ3ZTBiN2MxYzIzY2M0ZDgyNjgyIiwiaXBBZGRyIjoiNDkuMzYuMjEwLjM1Iiwic2NvcGUiOiIifQ.4KL3V0obxbi3dq_xhd7vqcQWcV9pYsqp33h8RIGchnk"
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