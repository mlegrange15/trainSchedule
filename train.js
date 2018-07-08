// Initialize Firebase
var config = {
    apiKey: "AIzaSyA0lM-Mtmz3OzHaPlco0JC-FVymFP0LV6M",
    authDomain: "trainschedule-65790.firebaseapp.com",
    databaseURL: "https://trainschedule-65790.firebaseio.com",
    projectId: "trainschedule-65790",
    storageBucket: "trainschedule-65790.appspot.com",
    messagingSenderId: "1086970319814"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// on click of the form submit take the user input and put it in firebase
  $("#submit-form").on("click", function(event) {
    event.preventDefault();
    alert("Working");

    var trainName = $("#train-name-form").val().trim();
    var destination = $("#destination-form").val().trim();
    var firstTrainTime = $("#train-time-form").val().trim();
    var frequency = $("#frequency-form").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });

    // clears the text out of the form to get ready for a new entry
      $(".form-control").val("")

    // go into the firbase databse and retrieve the info we need to populate our table
      database.ref().on("child_added", function(childSnapshot) {

        // function that will dynamically add the table rows to the tbody with the corresponding data needed from firebase
        var createRows = function() {
            // Get reference to existing tbody then create a new table row element
            var tBody = $("tbody");
            var tRow = $("<tr>");
        
            
            var trainNameTable = $("<td>").text(childSnapshot.val().trainName);
            var destinationTable = $("<td>").text(childSnapshot.val().destination);
            var frequencyTable = $("<td>").text(childSnapshot.val().frequency);
            var nextArrivalTable = $("<td>").text("placeholder");
            var minutesAwayTable = $("<td>").text("placeholder");

            // Append the newly created table data to the table row
            tRow.append(trainNameTable, destinationTable, frequencyTable, nextArrivalTable, minutesAwayTable);
            // Append the table row to the table body
            tBody.append(tRow);
            // puts the tbody variable onto the page
            $("#tbody").append(tBody);

            console.log(childSnapshot.val().trainName);

        }
    // call the createRows function to populate the page
        createRows();
      
      // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });


});