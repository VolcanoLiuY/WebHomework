var isStart = false;
var isCheat = true;
var isRed =false;
window.onload = function() {
    document.addEventListener('mouseover', MAZE);
}

function MAZE(e) {
    var target = e.target;
    if (isRed) {
        document.getElementById('redWall').id = "wall";
        isRed = false;
    };
    if ('s' === target.id) {
        isStart = true;
        document.getElementById('notice').textContent = " Begin!";
    } else if (isStart === true){
        if ('e' === target.id) {
            if (isCheat === true) {
                document.getElementById('notice').textContent = "Don't cheat, you should start from the 's' and move to the 'e' inside the maze!";
                isStart = false;
            } else {
                document.getElementById('notice').textContent = "You Win";
                isStart = false;
            }
        } else if ("wall" === target.id ) {
            if (isRed === false) {
                target.id = "redWall";
            }
            document.getElementById('notice').textContent = "You Lose";
            isStart = false;
            isRed = true;
        } else if ( target.className === "path path5") {
            isCheat = false;
        } else {
            document.getElementById('notice').textContent = "Gaming";
            isCheat = true;
        }
    }
}