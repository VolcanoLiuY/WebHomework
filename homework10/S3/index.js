$(document).ready(function () {
  $('.apb').click(getRandomNumber);
  $('#button').mouseleave(reset);
});

var database = {A:false, B:false, C:false, D:false, E:false}
var robot = ['A', 'B', 'C', 'D', 'E'];
var number = [0, 0, 0, 0, 0];
function done(i,callback) {
  waiting(i);
  $.get("rand_num"+i,
  function (data, textStatus) {
    console.log(data);
    excuting(i, data);
    if (i) {
      console.log(data);
      getNmuberSum();
    }
  });
  // if (i == 4) {
  //   getNmuberSum();
  // }
}

function getRandomNumber() {
  for (var i = 0; i < 5; i++) {
    done(i);
  }
}


function waiting(i) {
  changStyle(".button", "gray");
  $('#'+robot[i]+' .unread').css("opacity","1");
  $('#'+robot[i]+' .unread').html("...");
}

function excuting(i, data) {
  number[i] = data;
  $('#'+robot[i]+' .unread').html(number[i]);
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
  console.log(sum);
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
