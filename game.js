var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level =0; 

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animationPress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animationPress(currentColour){
    $("#"+ currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

// $(document).click(function(){
//     if (!started){
//         $("#level-title").text("level " + level);
//         nextSequence();
//         started = true;
//     }
// });

function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("sucess");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{

        console.log("Wrong");
        playSound("Wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    started = false;
    gamePattern=[];
    level=0;
}