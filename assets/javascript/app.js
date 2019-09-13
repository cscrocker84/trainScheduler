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