
  var config = {
    apiKey: "AIzaSyDvLx8gO3K6NCnaccKbJRiU0sSXvQd8pkI",
    authDomain: "train-scheduler-60d30.firebaseapp.com",
    databaseURL: "https://train-scheduler-60d30.firebaseio.com",
    projectId: "train-scheduler-60d30",
    storageBucket: "",
    messagingSenderId: "617738540517"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: firstTrain,
    frequency: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});

// database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());
  
//     // Store everything into a variable.
//     var empName = childSnapshot.val().name;
//     var empRole = childSnapshot.val().role;
//     var empStart = childSnapshot.val().start;
//     var empRate = childSnapshot.val().rate;
  
//     // Employee Info
//     console.log(empName);
//     console.log(empRole);
//     console.log(empStart);
//     console.log(empRate);
  
//     // Prettify the employee start
//     var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
//     // Calculate the months worked using hardcore math
//     // To calculate the months worked
//     var empMonths = moment().diff(moment(empStart, "X"), "months");
//     console.log(empMonths);
  
//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     console.log(empBilled);
  
//     // Create the new row
//     var newRow = $("<tr>").append(
//       $("<td>").text(empName),
//       $("<td>").text(empRole),
//       $("<td>").text(empStartPretty),
//       $("<td>").text(empMonths),
//       $("<td>").text(empRate),
//       $("<td>").text(empBilled)
//     );
  
//     // Append the new row to the table
//     $("#employee-table > tbody").append(newRow);
//   });