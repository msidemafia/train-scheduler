
var config = {
    apiKey: "AIzaSyDvLx8gO3K6NCnaccKbJRiU0sSXvQd8pkI",
    authDomain: "train-scheduler-60d30.firebaseapp.com",
    databaseURL: "https://train-scheduler-60d30.firebaseio.com",
    projectId: "train-scheduler-60d30",
    storageBucket: "train-scheduler-60d30.appspot.com",
    messagingSenderId: "617738540517"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#destination").val().trim();
        var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").format("");
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
});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(frequency);

    var currentTime = moment("HH:mm");
    console.log(currentTime);

    var diffTime = moment().diff(moment(firstTrain), "minutes");

    var diffTimeRemainder = diffTime % frequency;

    var minutesAway = frequency - diffTimeRemainder;

    var nextArrival = moment().add(minutesAway, 'm').format('hh:mm A');

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );

    $("#train-table > tbody").append(newRow);
});