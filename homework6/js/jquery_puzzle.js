var picPosition = new Array([1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]);//标记原始位置
var posY, posX;//标记目标坐标
var flag = true;//检查空白位置
var blankX, blankY;//标记空白坐标

$(document).ready(function(){
    $('#gameArea div').click(Sliding);
    $('#start').click(randomOrder);
})
function Sliding(e) {
    markClick(e);
    canMove(e);
    isFinish();
}

function canMove(e) {
    var distance = (posX-blankX)*(posX-blankX)+(posY-blankY)*(posY-blankY);
    if (distance == 1) {//两个滑块距离为1时进行滑动，交换ID并把picture的position更新。
        picPosition[blankX][blankY] = picPosition[posX][posY];
        picPosition[posX][posY] = 16;
        $('#p16').attr('id',e.target.id);
        e.target.id="p16";
    }
}

function isFinish() {//结束的判断，当矩阵恢复到顺序排列时结束
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (picPosition[i][j] != 4*i+j+1) return;
        }
    }
    alert("CONGRATULATIONS!");
}

function randomOrder() {//乱序
    var random, temp;
    while (canFinish()) {//检查逆序数对
        for (i = 14; i >= 0; i--) {
            random = Math.round(Math.random()*i);
            tmp = picPosition[Math.floor(i/4)][i%4];
            picPosition[Math.floor(i/4)][i%4] = picPosition[Math.floor(random/4)][random%4];
            picPosition[Math.floor(random/4)][random%4] = tmp;
        }
    }
    update();//更新坐标位置
}

function markClick(e) {
    markBlank();
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
}

function markBlank() {
    if(flag) {
        blankX = 3;
        blankY = 3;
        flag = false;
    }
}

function update() {
    var pic = document.getElementsByClassName("pic");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (!(i == 3 && j == 3)) {
                pic[4*i+j].id = "p"+picPosition[i][j];//通过交换ID，改变矩阵的图片
            }
        }
    }
}

var p = 8;//p=m+n+con;
function canFinish() {
    for (i = 0 ; i < 4; i++) {
        for (j = 0; j < 3; j++) {
            if (picPosition[i][j] !== i*4+j+1) {
                p++;
            }
        }
    }
    return p%2==0;
}
