const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
  level++;
  $("#level-title").text(`Level ${level}`);
};

function makeSound(color) {
  switch (color) {
    case "red":
      let red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      let blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      let green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      let yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
  }
}

$(".btn").click(function(event) {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed")
  setTimeout(function() {
    $(`#${currentColor}`).removeClass("pressed")
  }, 100);
}

let gameStarted = false;

$(document).keypress(function() {
  if (gameStarted == false) {
    gameStarted = true;
    $("#level-title").text("Level 0")
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}
