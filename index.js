var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//to keep track of whether if the game has started or not
var started = false;

//start at level 0
var level = 0;

//detecting when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//detecting when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});




function nextSequence() {

    //Once nextSequence() is triggered, reset to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    //check if the most recent user answer is the same as the game pattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //If the user got the most recent answer right in previous if statement, then check that they have finished their sequence.
        if (userClickedPattern.length === gamePattern.length) {

            if (level === 20) {
                $("body").addClass("game-won");
                setTimeout(function() {
                    $("body").removeClass("game-won");
                }, 200);

                $("#level-title").text("Game Won! Press Any Key to Restart");

                startOver();

            } else {
                //Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }

        }

    } else {

        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call startOver() if the user gets the sequence wrong.
        startOver();

    }

}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}