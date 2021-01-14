// How to create a server to run a web app locally in your browser

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}



// Routes

//app.get() is used to make a GET request
// response is sent using .send()
//whenever the project home URL is visited in the browser, there will be a GET request made to the server
//Request and Response Parameters 
//The req parameter signifies the "request" from the client to the server.
//The res parameter signifies the "response" from the server to the client.



// setup GET route
//In this example, we created a new route named '/get',
// so that the route 'localhost:3000/get' will now trigger the GET request,
// which will return the JavaScript object as laid out in the server code above.

app.get('/getRoute', sendData);

function sendData(request, response) {
  response.send(projectData);
};



//setup post function
app.post('/postRoute', postAllData);

function postAllData(request, response) {

  let data = request.body;

  projectData["temp"] = data.temp;
  projectData["feelings"] = data.feelings;
  projectData["date"] = data.date;

  response.send(projectData)

}
