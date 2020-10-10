var gamePattern = [];
var buttonColors = ["red", "blue" , "green" , "yellow"];
var userClickedPattern = []
var count = 0;
var started = false;

// event listener for the coloured buttons

$(".btn").on("click" ,function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animateIt(userChosenColor);
  playSound(userChosenColor);
  checkSequence(userClickedPattern.length-1);


});

// event listener for key press to start the game
$("h1").on("click tap" , function() {
  if (!started){
    nextSequence();
    started = true;
  }
} );



// nextSequence() produces sequence of randomly generated buttonColors

function nextSequence() {
  $("h1").text("Level  " + count);
  count++;
var randomNumber = Math.floor(Math.random() *4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

// Logic of the game

function checkSequence(digit) {

  if (gamePattern[digit] == userClickedPattern[digit])
  {
    if (userClickedPattern.length == gamePattern.length )
     {
    setTimeout(nextSequence , 400);
    userClickedPattern.length = 0;

    }

  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart (YOUR SCORE =" + count + ")");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateIt(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function startOver() {
  count = 0;
  gamePattern=[];
  userClickedPattern = [];
  started = false;
}
