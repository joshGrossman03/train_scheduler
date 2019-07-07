


  var Config = {
    apiKey: "AIzaSyA3MLHgrJ_3fPu5D9wdg9ZzWtNd6lLcTPM",
    authDomain: "train-scheduler-9485a.firebaseapp.com",
    databaseURL: "https://train-scheduler-9485a.firebaseio.com",
    projectId: "train-scheduler-9485a",
    storageBucket: "train-scheduler-9485a.appspot.com",
    messagingSenderId: "713968513507",
    appId: "1:713968513507:web:6ed04d5149e93174"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);

  
  
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = 0;
  
   // Capture Button Click
  $("#add-train").on("click", function(event) {
      event.preventDefault();
  
      
      trainTime = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTime = $("#first-time").val().trim();
      frequency = $("#frequency").val().trim();
  
      database.ref("/trains").push({
          trainName : trainName,
          destination : destination,
          firstTime : firstTime,
          frequency : frequency
      });
  
    
  
  });
  
  database.ref("/trains").on("child_added", function(childSnapshot) {
  
    // Log everything that's coming out of childSnapshot
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTime);
      console.log(childSnapshot.val().frequency);
  
      // Change the HTML to reflect
      trainName = childSnapshot.val().trainName;
      destination = childSnapshot.val().destination;
      firstTime = childSnapshot.val().firstTime;
      frequency = childSnapshot.val().frequency;
      
  
      $("#train-schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" 
      + "Months" + "</td><td>" + firstTime + "</td><td>" + "Amount" + "</td>");
  
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });