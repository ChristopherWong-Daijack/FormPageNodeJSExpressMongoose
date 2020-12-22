const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
//const fs = require('fs');
const postRoute = require('./routes/post');
//const { urlencoded } = require("body-parser");
require('dotenv/config');

app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
//Listen to server
app.listen(5000);


//import Routes

app.use('/post',postRoute);

//ROUTES

//connect to database
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },()=>{
    console.log("connected!!!!");
})