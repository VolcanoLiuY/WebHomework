var picPosition = new Array();
for (var i = 0; i  < 4; i++) {
    picPosition[i] = new Array();
    for (var j = 0; j < 4; j++) {
        picPosition[i][j] = i*4+j+1;
    }
};

window.onload = function() {
    document.getElementById('start').onclick = game;
}

function game() {
    var i, j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var m = i*4+j+1;
            var p = document.getElementById("p"+m);
            if(p) {//Cannot read property 'addEventListener' of null
                console.log("a");
                p.addEventListener('click', Sliding);
            }
        }
    }
    randomOrder();
}

function isFinish() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (picPosition[i][j] != 4*i+j+1) return;
        }
    }
    alert("CONGRATULATIONS!");
}

function randomOrder() {
    
    var i, j;
    var random, temp;
    for (i = 14; i >= 0; i--) {
        random = Math.round(Math.random()*i);
        tmp = picPosition[Math.floor(i/4)][i%4];
        picPosition[Math.floor(i/4)][i%4] = picPosition[Math.floor(random/4)][random%4];
        picPosition[Math.floor(random/4)][random%4] = tmp;
    }

    var pic = document.getElementsByClassName("pic");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (!(i == 3 && j == 3)) {
                // console.log(picPosition[i][j]);
                pic[4*i+j].id = "p"+picPosition[i][j];
            }
        }
    }
}

function Sliding(e) {
    var posY, posX;
    var flag = true;
    var blankX, blankY;
    if(flag) {
        blankX = 3;
        blankY = 3;
        flag = false;
    }
    console.log(e.target.id)
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if ("p"+picPosition[i][j] == e.target.id) {
                posX = i;
                posY = j;
            }
            if (picPosition[i][j] == 16) {
                blankX = i;
                blankY = j;
            }
        }
    }
    // console.log(posX);
    // console.log(posY);
    // console.log(blankX);
    // console.log(blankY);

    var distance = (posX-blankX)*(posX-blankX)+(posY-blankY)*(posY-blankY);
    // console.log(distance);
    if (distance == 1) {
        picPosition[blankX][blankY] = picPosition[posX][posY];
        picPosition[posX][posY] = 16;
        document.getElementById("p16").id = e.target.id;
        e.target.id="p16";
    }
    isFinish();
}

