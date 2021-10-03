// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

//This callback function which will post the data to the server 
const postRoute=(req,res)=>{
    //console.log(req.body);
     projectData=req.body;
}

app.post("/addTheSendingData",postRoute);

//This callback function which will get the data from the server 
const getRoute=(req,res)=>{
    res.send(projectData);
}

app.get("/sendAllData",getRoute);


// This function will listen the server through the port and check its working
const server = app.listen(port,()=>{
    console.log(`Your server is working on port:${port}`);
})

