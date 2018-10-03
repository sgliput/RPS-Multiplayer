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

var firstWeapon = 0;
console.log(firstWeapon);
var secondWeapon = 0;



  $(".weapon").on("click", function () {
    
    if (firstWeapon === 0) {
    firstWeapon = $(this).attr("id");
    console.log($(this).attr("id"));
    
    console.log("First Weapon: " + firstWeapon);

    database.ref().push({
      firstPlayer: firstWeapon
    });
  } else if (firstWeapon !== 0) {
    secondWeapon = $(this).attr("id");
    console.log("Second Weapon: " + secondWeapon);

    database.ref().push({
      secondPlayer: secondWeapon
    });
    $(".weapon").prop("disabled", true);

  }
  });



  


database.ref().on("child_added", function (snapshot) {
  console.log(snapshot.val());
  child = snapshot.val();
  var id = snapshot.key;
  console.log(id);


});
