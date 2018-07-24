
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
    console.log("hello");
    

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    date = $("#start-date").val().trim();
    salary = $("#salary").val().trim();


    // Code for handling the push
    database.ref().set({
      name: name,
      role: role,
      date: date,
      salary: salary,
    });
  });


$( document ).ready(function() {
    console.log( "ready!" );
});

