//const { response } = require("express");

   
/* Global Variables */
const basicURL      ="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey        ="&appid=afb5d5f0ace94a349dfaeeefaca2971a&units=metric";
const localServerURL="http://localhost:8000/"


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
 


// This callback function will collect the data from the UI,to get the data from the OpenweatherAPI, post the data to the server then update the UI with special data 
const collectUiData= async()=>{
  const theZipCode    = document.getElementById("zip").value; 
  const userResponse  = document.getElementById("feelings").value;
    getRequestFrom_API(basicURL,theZipCode,apiKey)// invoking the function which foes the get request from the API
     .then(function(weatherData){
        console.log(weatherData)
        postRequestToTheServer("/addTheSendingData",{temp:weatherData.main.temp,theDate:newDate,contentOfUser:userResponse});// invoking the post function which will send the data to the browser
        uiUpdating();
      })
}

document.getElementById("generate").addEventListener("click",collectUiData); // clicking on the button to call the collectUiData.

// callback function which will get the information about the the weather from the api.
const  getRequestFrom_API = async(basicURL,newTheZipCode,apiKey)=>{
    try{
    const apiResposneAbourWeather = await fetch(basicURL+newTheZipCode+apiKey)
    const newDataOfWeather = await apiResposneAbourWeather.json()
    
    console.log(newDataOfWeather)
    if(newDataOfWeather.cod != 200){
      alert("Please enter the right zipcode");
    }
    return newDataOfWeather;//retuning the data to the browser "client"
    }
    catch(error){
        console.log("error",error);
    }
} 



//the callback function which its role is sending the data to the server the post route
const postRequestToTheServer =async(URL="",weatherData2={})=>{
     //console.log(weatherData2);
     const serverResponse = await fetch(URL, {
     method: 'POST', 
     credentials: 'same-origin',
     headers: {
        'Content-Type': 'application/json',
    },
   // Body weatherData type must match "Content-Type" header        
    body: JSON.stringify(weatherData2), 
  });

    try {
      const newDataOfServer = await serverResponse.json()
      return newDataOfServer;
    }catch(error) {
      console.log("error", error);
    }
}


// This is the callback function which will update the UI with returned data from the server
const uiUpdating = async() =>{
  const responseServer = await fetch("/sendAllData");
  try{
   responseServer.json().then(dataOfWeath=>{
     console.log(responseServer)
     document.getElementById("title").style.cssText="background-color:green;";
     document.getElementById("temp").innerHTML=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
     <title>thermometer-half</title>
     <path d="M16.986 23.166c1.173 0.408 2.014 1.523 2.014 2.834 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.311 0.841-2.426 2.014-2.834-0.009-0.055-0.014-0.111-0.014-0.168v-9.995c0-0.547 0.448-1.002 1-1.002 0.556 0 1 0.449 1 1.002v9.995c0 0.057-0.005 0.113-0.014 0.168v0zM18 22.535v-18.532c0-1.107-0.888-2.004-2-2.004-1.105 0-2 0.89-2 2.004v18.532c-1.196 0.692-2 1.984-2 3.465 0 2.209 1.791 4 4 4s4-1.791 4-4c0-1.481-0.804-2.773-2-3.465zM19.969 21.5c1.246 1.099 2.031 2.708 2.031 4.5 0 3.314-2.686 6-6 6s-6-2.686-6-6c0-1.792 0.786-3.401 2.031-4.5-0.021-0.165-0.031-0.332-0.031-0.503v-16.994c0-2.205 1.791-4.003 4-4.003 2.205 0 4 1.792 4 4.003v16.994c0 0.17-0.011 0.338-0.031 0.503v0 0z"></path>
     </svg>
      The temprature is: ${dataOfWeath.temp} &degC`;
     document.getElementById("date").innerHTML=`<svg  version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
     <title>calendar</title>
     <path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"></path>
     </svg> 
      The date of today: ${dataOfWeath.theDate}`;
     document.getElementById("content").innerHTML=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
     <title>user-tie</title>
     <path d="M10 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6s-6-2.686-6-6zM24.002 14h-1.107l-6.222 12.633 2.327-11.633-3-3-3 3 2.327 11.633-6.222-12.633h-1.107c-3.998 0-3.998 2.687-3.998 6v10h24v-10c0-3.313 0-6-3.998-6z"></path>
     </svg>
     Your response:${dataOfWeath.contentOfUser}`;
     })
  }catch(error){
    console.log("error", error);
  }
}

