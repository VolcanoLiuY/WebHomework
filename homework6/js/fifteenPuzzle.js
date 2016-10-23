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
    if (distance == 1) {//两个滑块距离为1时进行滑动，交换ID并把picture的position更新。
        picPosition[blankX][blankY] = picPosition[posX][posY];
        picPosition[posX][posY] = 16;
        document.getElementById("p16").id = e.target.id;
        e.target.id="p16";
    }
    isFinish();
}



function isFinish() {//结束的判断，当矩阵恢复到顺序排列时结束
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (picPosition[i][j] != 4*i+j+1) return;
        }
    }
    alert("CONGRATULATIONS!");
}

function randomOrder() {
    
    var i, j;
    var p = 8;//p=m+n+con;
    var random, temp;
    var isValid =false;
    while (isValid == false ) {
        for (i = 14; i >= 0; i--) {
        random = Math.round(Math.random()*i);
        tmp = picPosition[Math.floor(i/4)][i%4];
        picPosition[Math.floor(i/4)][i%4] = picPosition[Math.floor(random/4)][random%4];
        picPosition[Math.floor(random/4)][random%4] = tmp;
        }
        // 设两个矩阵A和B。将矩阵从左到右，从上到下排成一个一维数组，设其
        // 逆序对的个数加上空白格在原矩阵所在的行列号之和P。若P(A)与P(B)
        // 的奇偶性相同，则两个矩阵可以通过拼图游戏进行转换。
        // p = n+m+con。其中con为data[0...n*m-2]的逆序对个数。
        // 所以直接判断变换后的矩阵的P是不是偶数就好了。
        for (i = 0 ; i < 4; i++) {
            for (j = 0; j < 3; j++) {
                if (picPosition[i][j] !== i*4+j+1) {
                    p++;
                }
            }
        }
        if (p%2 == 0 ) {
            isValid = true;
        }
    }

    var pic = document.getElementsByClassName("pic");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (!(i == 3 && j == 3)) {
                // console.log(picPosition[i][j]);
                pic[4*i+j].id = "p"+picPosition[i][j];//通过交换ID，改变矩阵的图片
            }
        }
    }
}


