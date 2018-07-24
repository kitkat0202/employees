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
    console.log(sv.name);
    
    
    var monthWorked = 0
    var total = 0

    $(".table tbody").append($("<tr>").addClass(count).html(`<td>${sv.name}</td><td>${sv.role}</td><td>${sv.date}</td><td>${monthWorked}</td><td>${salary/12}</td><td>${total}</td>`))
    // Change the HTML to reflect

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


$( document ).ready(function() {
    console.log( "ready!" );
});

