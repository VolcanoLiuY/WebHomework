$(document).ready(function () {
  $('.apb').click(getRandomNumber);
  $('#button').mouseleave(reset);
});

var database = {A:false, B:false, C:false, D:false, E:false}
var robot = ['A', 'B', 'C', 'D', 'E'];
var number = [0, 0, 0, 0, 0];
function done(i) {
  // waiting(i);
  $.get("127.0.0.1",function (data, textStatus, jqXHR) {
    excuting(i, data);
    i++;
    $.get("127.0.0.1",function (data, textStatus, jqXHR) {
      excuting(i, data);
      i++;
      $.get("127.0.0.1",function (data, textStatus, jqXHR) {
        excuting(i, data);
        i++;
        $.get("127.0.0.1",function (data, textStatus, jqXHR) {
          excuting(i, data);
          i++;
          $.get("127.0.0.1",function (data, textStatus, jqXHR) {
            excuting(i, data);
            i++;
            for (var j = 0; j < 5; j++) {
              $('#'+robot[j]+' .unread').html(number[j]);
            }
            getNmuberSum();
          });
        });
      });
    });
  });
      // for (var j = 0; j < 5; j++) {
      //   $('#'+robot[j]+' .unread').html(number[j]);
      // }
      // getNmuberSum();
}

function getRandomNumber() {
  console.log(robot[0]);
  done(0);
  waiting();
}



function waiting(i) {
  changStyle(".button", "gray");
  $('.unread').css("opacity","1");
  $('.unread').html("...");
}
// function waiting(i) {
//   changStyle(".button", "gray");
//   $('#'+robot[i]+' .unread').css("opacity","1");
//   $('#'+robot[i]+' .unread').html("...");
// }

function excuting(i, data) {
  console.log(data);
  number[i] = data;
  database[robot[i]] = true;
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
