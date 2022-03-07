const express = require("express");
const app = express();

// CONFIG
require('dotenv').config();

const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Middleware
const middleware = require('./../middlewares');

// DEFISNSI ROUTER
const giftRouters = require("./gift")
const userRouters = require("./user")
const auth = require("./login")
const upload = require('./upload')

// USE ROUTER
app.use("/gifts", middleware.accessToken, giftRouters);
app.use("/users", middleware.accessToken, userRouters);
app.use("/upload", middleware.accessToken, upload);
app.use("/login", auth);

app.listen(process.env.PORT, ()=>{
    console.log('server run port : ',process.env.PORT)
})