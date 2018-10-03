// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYgcm-jsiY5LQeUoUtYKuX6291aCyjHxc",
  authDomain: "rock-paper-scissors-d2954.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-d2954.firebaseio.com",
  projectId: "rock-paper-scissors-d2954",
  storageBucket: "rock-paper-scissors-d2954.appspot.com",
  messagingSenderId: "970899650959"
};
firebase.initializeApp(config);

var database = firebase.database();
var id = "-LNsVwQcq5Nb9233VfZu";

var firstWeapon = 0;
console.log(firstWeapon);
var secondWeapon = 0;
var player1wins = 0;
var player2wins = 0;
var player1losses = 0;
var player2losses = 0;
var ties;





$(".weapon").on("click", function () {
  $("#winner").empty();
  $("#yourChoice").empty();
  $("#opponentChoice").empty();
  if (firstWeapon === 0) {
    firstWeapon = $(this).attr("id");
    console.log($(this).attr("id"));
    $("#yourChoice").html("<p>Player 1 chose " + firstWeapon + ".</p>");

    console.log("First Weapon: " + firstWeapon);

    database.ref(id).update({
      firstPlayer: firstWeapon
    });
  } 
});


database.ref().on("child_added", function (snapshot) {
  var child = snapshot.val();
  ties = child.bothTies;
  $("#ties").html(ties);
});

database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());
  var child = snapshot.val();
  var first = child[id].firstPlayer;
  var second = child[id].secondPlayer;

  
  $(".weapon").on("click", function () {
    if (first !== 0 && secondWeapon === 0) {
    
    secondWeapon = $(this).attr("id");
    console.log("Second Weapon: " + secondWeapon);
    $("#opponentChoice").html("<p>Player 2 chose " + secondWeapon + ".</p>");

    database.ref(id).update({
      secondPlayer: secondWeapon
    });
    firstWeapon = 0;

  }
  }); 


if(firstWeapon === 0 && secondWeapon !== 0){
  database.ref(id).update({
    firstPlayer: 0,
    secondPlayer: 0
  });
  secondWeapon = 0;
}

  


  if ((first === "rock" && second === "rock") || (first === "paper" && second === "paper") || (first === "scissors" && second === "scissors")) {
    ties = child[id].bothTies;
    ties++;
    database.ref(id).update({
      firstPlayer: 0,
      secondPlayer: 0,
      bothTies: ties
    });
    $("#ties").html(ties);
    $("#winner").html("<h3>It was a tie!</h3>");
    firstWeapon = 0;
  } else if ((first == "rock" && second == "scissors") || (first === "paper" && second === "rock") || (first === "scissors" && second === "paper")) {




  };
});

  $("#reset").on("click", function () {
    database.ref(id).update({
      firstPlayer: 0,
      secondPlayer: 0,
      bothTies: 0,
      Player1Wins: 0,
      Player2Wins: 0,
      Player1Losses: 0,
      Player2Losses: 0
    });
    location.reload();
  })
