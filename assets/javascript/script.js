var count = 0
var config = {
    apiKey: "AIzaSyCcnYsUl9ZJ-xeYx9m4Pyl9F_9yTW6oDqI",
    authDomain: "my-awson-project.firebaseapp.com",
    databaseURL: "https://my-awson-project.firebaseio.com",
    projectId: "my-awson-project",
    storageBucket: "my-awson-project.appspot.com",
    messagingSenderId: "1045330612371"
    };
    firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    date = $("#start-date").val().trim();
    salary = $("#salary").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      role: role,
      date: date,
      salary: salary,
    });
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var monthRate = Math.floor(parseInt(sv.salary)/12)

    var monthStart = new Date (sv.date)
    var today = new Date();

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
    var monthWorked = monthDiff(monthStart, today)
    
    var total = monthRate * monthWorked

    $(".table tbody").append($("<tr>").addClass(count).html(`<td>${sv.name}</td><td>${sv.role}</td><td>${sv.date}</td><td>${monthWorked}</td><td>${monthRate}</td><td>${total}</td>`))
    // Change the HTML to reflect

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


$( document ).ready(function() {
    console.log( "ready!" );
});

