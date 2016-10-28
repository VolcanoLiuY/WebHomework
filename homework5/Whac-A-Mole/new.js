var ran;

window.onload = function() {
    var start_flag = 0;
    var t;
    var temp;
    var start = document.getElementById("start");
    var time = document.getElementById("time");
    var game_over = document.getElementById("status");
    var score = document.getElementById("score");
    var moles = document.getElementsByClassName("hole");
    start.addEventListener('click', function() {
        if (start_flag == 0) {
            game_over.value = "Playing";
            t = 30;
            score.value = 0;
            time.value = t;
            start_flag = 1;
            random_moles(moles);
            fgame_start(start_flag);
        }
        else if (start_flag == 1) {
            fgame_over(moles);
            start_flag = 0;
            clearTimeout(temp);
            time.value = 0;
        }
    });
    for (var i = moles.length - 1; i >= 0; i--) {
        (function(m) {
            moles[m].addEventListener("click", function() {
                if (m != ran) {
                    score.value = score.value*1-1;
                    moles[m].checked = false;
                }
                if (m == ran) {
                    score.value = score.value*1+1;
                    moles[m].checked = false;
                    random_moles(moles);
                }
            })
        })(i)
    }
}

function fgame_start(start_flag){
    t = time.value-1;
    time.value = t;
    if (t > 0) {
        temp = setTimeout("fgame_start()", 1000);
    }
    if (t == 0) {
        fgame_over();
    }
}
function fgame_over(moles) {
    for (var i = moles.length - 1; i >= 0; i--) {
        moles[i].checked = false;
    }
    game_over.value = "Game over!";
    alert("Game over !\nYour score is :"+score.value);
}
function random_moles(moles) {
    ran = Math.floor(Math.random()*60);
    moles[ran].checked = true;
}
