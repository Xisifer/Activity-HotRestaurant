// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sets up TABLES DATA
// =============================================================




const waitList = [];

const reservationList = [
    // {
    // name:$("#first_name").val().trim(),
    // phone:$("#phone_number").val().trim(),
    // email:$("#email").val().trim(),
    // uid:$("#uninque_id").val().trim()
    // }
    {
        name:"Jane 'Eleven' Ives",
        phone:"(555)123-4567",
        email:"janedoe@oed.in.gov",
        uid:"Eleven"
    },
    {
        name:"Jim Hopper",
        phone:"(555)123-4567",
        email:"jhopper@hawkinspd.in.gov",
        uid:"FatRambo"
    }
];

console.log(reservationList);





// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/data", function(request, response) {
    response.sendFile(path.join(__dirname, "data.html"));
  });

  app.get("/reserve", function(request, response) {
    response.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  // Displays all characters
  app.get("/api/reservations", function(request, response) {
    response.json(reservationList);
  });
  

  
  // Create New Reservation - takes in JSON input
  app.post("/api/reservations", function(request, response) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = request.body;

  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    if (reservationList.length <= 5) {
        reservationList.push(newReservation);
    } else {
        waitList.push(newReservation);
    }


    response.json(newReservation);


  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  