var GameTime = 30;
var isStart = false;
var isBlue = false;
var SCORE = 0;

function random() {
    GameTime--;
    var time = document.getElementById('time');
    time.value = GameTime;
    if (GameTime === 0) {
        clearInterval(id);
        document.getElementById('status').value="Game over";
        alert("Game Over, you score is "+SCORE);
    }
    var number = Math.round(Math.random()*60);
    var theBlue = document.getElementById(number);

    if (isBlue === false) {
        theBlue.checked = true;
        isBlue = true;
    }

    // addEventListener('click', function(e) {
    //     var theClick = e.target;
    //     if (theClick.id === theBlue.id) {
    //         target.checked = false;
    //         SCORE++;
    //         document.getElementById('score').value = SCORE;
    //         isBlue = false;
    //     } else {
    //         SCORE--;
    //         document.getElementById('score').value = SCORE;
    //     }
    // });

    theBlue.addEventListener('click', function () {
        theBlue.checked = false;
        SCORE++;
        document.getElementById('score').value = SCORE;
        isBlue = false;
    });


}

function game (){
    if (isStart === false) {
        isStart = true;
        document.getElementById('status').value="Playing";
        id = setInterval(random, 1000);
    } else { //isStart === true
        isStart = false;
        clearInterval(id);
    }
}

window.onload = function () {
    document.getElementById('start').addEventListener('click', game);
}

