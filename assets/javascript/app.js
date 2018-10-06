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
var id = "-LO1IZ-vecg-G_L6fo-a";

var firstWeapon = 0;
console.log(firstWeapon);
var secondWeapon = 0;
var player1wins = 0;
var player2wins = 0;
var ties = 0;

var reset = function () {
  database.ref(id).update({
    player1: false,
    player2: false,
    gameBegin: false,
    firstMove: 0,
    secondMove: 0,
    bothTies: 0,
    Player1Wins: 0,
    Player2Wins: 0,
  });
}


$("#player1").on("click", function () {
  database.ref(id).update({
    player1: true
  });
  sessionStorage.clear();
  sessionStorage.setItem("player", "Player 1");
});


$(".weapon").on("click", function () {

  if (sessionStorage.getItem("player") === "Player 1") {
    firstWeapon = $(this).attr("id");
    console.log($(this).attr("id"));
    $("#oneChoice").show();
    $("#oneChoiceChoice").html(firstWeapon);

    console.log("First Weapon: " + firstWeapon);

    database.ref(id).update({
      firstMove: firstWeapon
    });
  } else if (sessionStorage.getItem("player") === "Player 2") {

    secondWeapon = $(this).attr("id");
    console.log("Second Weapon: " + secondWeapon);
    $("#twoChoice").show();
    $("#twoChoiceChoice").html(secondWeapon);

    database.ref(id).update({
      secondMove: secondWeapon
    });
    firstWeapon = 0;

  }
});


database.ref().on("child_added", function (snapshot) {
  var child = snapshot.val();

  if (child.player1 && child.player2 && sessionStorage.getItem("player") !== "Player 1" && sessionStorage.getItem("player") !== "Player 2") {
    $("body").html("<h1>Sorry, but this game is already occupied.</h1>")
  } else if (child.player1 && sessionStorage.getItem("player") !== "Player 1") {
    $("#player1").hide();
    database.ref(id).update({
      player2: true
    });
    sessionStorage.clear();
    sessionStorage.setItem("player", "Player 2");
  } else if(child.player1){
    $("#player1").hide();
  }

  ties = child.bothTies;
  $("#ties").html(ties);

  var player1wins = child.Player1Wins;
  $("#player1wins").html(player1wins);

  var player2wins = child.Player2Wins;
  $("#player2wins").html(player2wins);

});

database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());
  var child = snapshot.val();
  var first = child[id].firstMove;
  var second = child[id].secondMove;

  if (child[id].player1 && !child[id].player2) {
    $("#player1").hide();
  
    sessionStorage.clear();
    sessionStorage.setItem("player", "Player 2");
    database.ref(id).update({
      player2: true
    });
    ;
  }


  if (child[id].firstMove !== 0 && child[id].secondMove !== 0) {
    $("#oneChoice").show();
    $("#oneChoiceChoice").html(child[id].firstMove);
    $("#twoChoice").show();
    $("#twoChoiceChoice").html(child[id].secondMove);
  }

  if ((first === "Rock" && second === "Rock") || (first === "Paper" && second === "Paper") || (first === "Scissors" && second === "Scissors") || (first === "Lizard" && second === "Lizard") || (first === "Spock" && second === "Spock")) {
    ties = child[id].bothTies;
    ties++;
    database.ref(id).update({
      firstMove: 0,
      secondMove: 0,
      bothTies: ties
    });


    $("#ties").html(ties);
    $("#winnerDiv").show();
    $("#winner").html("<h3>It was a tie!</h3>");
    $(".weapon").prop("disabled", true);
  } else if ((first === "Rock" && second === "Scissors") || (first === "Paper" && second === "Rock") || (first === "Scissors" && second === "Paper") || (first === "Lizard" && second === "Spock") || (first === "Lizard" && second === "Paper") || (first === "Paper" && second === "Spock") || (first === "Rock" && second === "Lizard") || (first === "Scissors" && second === "Lizard") || (first === "Spock" && second === "Rock") || (first === "Spock" && second === "Scissors")) {

    player1wins = child[id].Player1Wins;
    player1wins++;
    database.ref(id).update({
      firstMove: 0,
      secondMove: 0,
      Player1Wins: player1wins,
    });
    $("#player1wins").html(player1wins);
    $("#winnerDiv").show();
    $("#winner").html("<h3>Player 1 wins!</h3>");
    $(".weapon").prop("disabled", true);
  } else if ((first === "Rock" && second === "Paper") || (first === "Paper" && second === "Scissors") || (first === "Scissors" && second === "Rock") || (first === "Spock" && second === "Lizard") || (first === "Paper" && second === "Lizard") || (first === "Spock" && second === "Paper") || (first === "Lizard" && second === "Rock") || (first === "Lizard" && second === "Scissors") || (first === "Rock" && second === "Spock") || (first === "Scissors" && second === "Spock")) {

    player2wins = child[id].Player2Wins;
    player2wins++;
    console.log(player2wins);
    database.ref(id).update({
      firstMove: 0,
      secondMove: 0,
      Player2Wins: player2wins,
    });
    $("#player2wins").html(player2wins);
    $("#winnerDiv").show();
    $("#winner").html("<h3>Player 2 wins!</h3>");
    $(".weapon").prop("disabled", true);
  }

});

$("#beginAgain").on("click", function () {
  $("#winnerDiv").hide();
  $("#winner").empty();
  $("#oneChoice").hide();
  $("#twoChoice").hide();
  $(".weapon").prop("disabled", false);
})



$("#reset").on("click", function () {
  reset();
  location.reload();
})

//window.onbeforeunload = closingCode;
//function closingCode() {
//  reset();
//  return null;
//}

/*Code for adding a record to Firebase
$("#player1").on("click", function(){
  database.ref().push({
    player1: false,
    player2: false,
    gameBegin: false,
    firstMove: firstWeapon,
    secondMove: secondWeapon,
    player1Wins: player1wins,
    player2Wins: player2wins,
    bothTies: ties
  });
})
*/