const express = require("express")
const router = express.Router()
bodyParser = require('body-parser').json()
const app = require("../app")
const axios = require('axios')
const Token = require("../models/token")
const fs = require("fs")
const { stringify } = require("querystring")

router.use(bodyParser)

function autCodeGenerate(){
    const chrome = require('selenium-webdriver/chrome');
    const {Builder, By, Key, until} = require('selenium-webdriver');
    
    const screen = {
      width: 640,
      height: 480
    };
    
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        .build();

    driver.get('https://api.fyers.in/api/v2/generate-authcode?client_id=IZ8CELPOJN-100&redirect_uri=http://localhost:3000/&response_type=code&state=sample_state')
    .then(() =>{
        driver.getCurrentUrl()
        .then(async (current_url) => {
            console.log(current_url)
            if(!current_url.includes("https://api.fyers.in")){
                console.log("localhost")
                const authCode = current_url.substring(current_url.indexOf("auth_code=") + 10).split("&state")[0]
                console.log(authCode)
                generateToken(authCode)
            }
            else if(current_url.includes("https://api.fyers.in")){
                console.log("Fyers")
                // console.log(await driver.getPageSource());
                await driver.findElement(By.id("fyers_id")).sendKeys(process.env.fyers_ID)
                console.log(await driver.findElement(By.id("fyers_id")).getAttribute("value"))
                await driver.findElement(By.id("password")).sendKeys(process.env.fyers_password)
                console.log(await driver.findElement(By.id("password")).getAttribute("value"))
                console.log(await driver.findElement(By.id("pancheck")).getAttribute("checked"))
                // await driver.findElement(By.id("pancheck")).submit()
                await driver.findElement(By.id("pancard")).sendKeys(process.env.pan)
                console.log(await driver.findElement(By.id("pancard")).getAttribute("value"))
                await driver.findElement(By.id("btn_id")).click()
                await new Promise(resolve => setTimeout(resolve, 5000))
                // WebDriverWait(driver, 15).until(EC.url_changes(current_url))
                // need to wait till page loads
                console.log("New url")
                const new_url = await driver.getCurrentUrl()
                console.log(new_url)
                const authCode = new_url.substring(new_url.indexOf("auth_code=") + 10).split("&state")[0]
                console.log(authCode)
                generateToken(authCode)
            }
            driver.quit()
        })
        .catch((error) => {
            console.log("error")
            console.log(error)
        })
    })
}

async function generateToken(authCode){
        await axios({
            method: 'post',
            url: `${process.env.baseURL}validate-authcode`,
            data:{
                "grant_type":"authorization_code",
                "appIdHash":process.env.appIdHash,
                "code":authCode
            }
        })
        .then(async response => {
                fs.writeFile("./token.json", `{"access_token":${JSON.stringify(response.data.access_token)}}`, err => {
                  if (err) console.log("Error writing file:", err);
                })
        })
        .catch ((e) => {
            console.log(e)
        })
}

try{
    fs.readFile("./token.json", "utf8", (err, jsonString) => {
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
        const token = JSON.parse(jsonString)
        console.log("Token:", token.access_token)
        axios({
            method: 'get',
            url: `${process.env.baseURL}profile`,
            headers: {
                "Authorization": `${process.env.appID}:${token.access_token}`
            }   
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) =>{
              console.log(error)
              autCodeGenerate()
          })
      })
}
catch{
    console.log("Catch")
    autCodeGenerate()
}
finally {
    // call funds function
    console.log("Finally")
}

router.get('/token', async (req,res) => {
    // code
})

module.exports = router