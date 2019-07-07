


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
  
      
      trainName = $("#train-name").val().trim();
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

      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
      
  
      $("#train-schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td");
  
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });
  
  
  
  function pushNew(){
  return database.ref("/trains/").once('value').then(function(snapshot) {
    $("#train-schedule").empty();
    
    snapshot.forEach(function(childSnapshot){
        
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    firstTime = childSnapshot.val().firstTime;
    frequency = childSnapshot.val().frequency;

    console.log(childSnapshot.val());
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    
   

    $("#train-schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td");
    });
  
});
  };
 
  function refreshData() {
    refreshTimes = setInterval(pushNew, 60000);
  
  };
  refreshData();
 
 
 