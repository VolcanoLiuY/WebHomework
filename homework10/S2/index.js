$(document).ready(function () {
  $('.apb').click(getRandomNumber);
  $('#button').mouseleave(reset);
});

var database = {A:false, B:false, C:false, D:false, E:false}
var robot = ['A', 'B', 'C', 'D', 'E'];

function done(i) {
  waiting(i);
  var req = $.get("127.0.0.1",
    function (data, textStatus, jqXHR) {
      excuting(i, data);
        if (i == 4) {
          getNmuberSum();
        } else {
          done(i+1);
        }
    }
  );
}

function getRandomNumber() {
  console.log(robot[0]);
  done(0);
}

function waiting(i) {
  changStyle(".button", "gray");
  changStyle("#"+robot[i], "blue");
  $('#'+robot[i]+' .unread').css("opacity","1");
  $('#'+robot[i]+' .unread').html("...");
}

function excuting(i, data) {
  $('#'+robot[i]+' .unread').html(data);
  database[robot[i]] = true;
  changStyle(".button", "blue");
  for (var key in database) {
    if ( database[key]) changStyle("#"+key, "gray");
  }
}

function changStyle(e,color) {
  $(e).css("background", color);
}


function getNmuberSum() {
  if (canCalculate()) {
  var sum = calculate();
  $('.result').html(sum);
  changStyle(".result", "gray");
  }
}

function canCalculate() {
  for (var key in database) {
    if ( !database[key]) return false;
  }
  return true;
}

function calculate() {
  var sum = 0;
	var nums =$(".unread");
	for (var i = 0; i < 5; i++) {
    sum += parseInt(nums[i].innerHTML);
  }
  return sum;
}

function reset() {
  $(".unread").css("opacity","0");
  $("#info-bar").html(" ");
  changStyle(".button", "blue");
  changStyle(".result", "gray");
}
