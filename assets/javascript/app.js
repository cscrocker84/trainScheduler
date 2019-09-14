var firebaseConfig = {
    apiKey: "AIzaSyAEMLqceqHic6yofep1IYv-n_dJ5Mh_koI",
    authDomain: "rest-practice-5a0a2.firebaseapp.com",
    databaseURL: "https://rest-practice-5a0a2.firebaseio.com",
    projectId: "rest-practice-5a0a2",
    storageBucket: "rest-practice-5a0a2.appspot.com",
    messagingSenderId: "190398716876",
    appId: "1:190398716876:web:1ecfefda0e2a83a2539b69"
  };

  firebase.initializeApp(firebaseConfig);
var database = firebase.database();

createRows();

//Add train to the firebase
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firsttrain: firstTrain,
        frequency: trainFrequency
    };

    if(newTrain.name !== '' && newTrain.destination !== '' && newTrain.firsttrain !== '' && newTrain.frequency !== ''){
        database.ref('trains/').push(newTrain);
    
        createRows();
    }
    else {
        $("#myToast").show();
        $('#myToast').toast('show');
    }
       
    
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    
    });
    
    var displayInterval = setInterval(createRows, 60 * 1000);
    
    function createRows() {
        $("#myToast").hide();
        $("#train-table > tbody").empty();
    
        database.ref('trains/').on("child_added", function (childSnapshot) {
            console.log(childSnapshot.key);
    
            // Store everything into a variable.
            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var firstTrain = childSnapshot.val().firsttrain;
            var trainFrequency = childSnapshot.val().frequency;
            var trainID = childSnapshot.key;  //Keep track of the node key of each train
    
            var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log("time converted " + firstTimeConverted);
    
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    
            console.log("DIFFERENCE IN TIME: " + diffTime);
    
            // Time apart (remainder)
            var tRemainder = diffTime % trainFrequency;
    
            // Minute Until Train
            var tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var arrivalTime = moment(nextTrain).format("HH:mm");
    
    
            var newRow = $("<tr>").append(
                $("<td class='train-name'>").text(trainName),
                $("<td class='train-dest'>").text(trainDestination),
                $("<td class='train-freq'>").text(trainFrequency),
                $("<td class='train-arrival'>").text(arrivalTime),
                $("<td class='train-minutes'>").text(tMinutesTillTrain),
                //Add a button to remove train from Schedule - pass in the node key to know which train to be removed
                $("<td class='remove-train-class'>").html("<button class='remove-train' data-id='"+trainID+"'>Remove</button>")
            );
    
    
            // Append the new row to the table
            $("#train-table > tbody").append(newRow);
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });
    
    }
    
    $(document).on("click", ".remove-train", function (event) {
        event.preventDefault();
    
        //Grab key of the node that needs to be removed from Firebase 
        var trainId = $(this).attr("data-id");
        var trainToBeRemoved = database.ref('trains/'+trainId);
     
        trainToBeRemoved.remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });;
     
        createRows();
    });