$(document).ready(function () {
  $('.button').click(getRandomNumber);
  $('.result').click(getNmuberSum);
  $('#button').mouseleave(reset);
});

var database = {A:false, B:false, C:false, D:false, E:false}
var isDoing = false;
var req;
function getRandomNumber(e) {
  var e = e.target;
  if (isDoing) return;
  if (hasClick(e)) return;
  done(e);
}

function done(e) {
  isDoing = true;
  waiting(e);
  req = $.get("localhost",
    function (data, textStatus, jqXHR) {
      excuting(e, data);
      isDoing = false;
    }
  );
}

function waiting(e) {
  changStyle(".button", "gray");
  changStyle("#"+e.id, "blue");
  $('#'+e.id+' .unread').css("opacity","1");
  $('#'+e.id+' .unread').html("...");
}

function excuting(e, data) {
  $('#'+e.id+' .unread').html(data);
  database[e.id] = true;
  changStyle(".button", "blue");
  for (var key in database) {
    if ( database[key]) changStyle("#"+key, "gray");
  }
}

function changStyle(e,color) {
  $(e).css("background", color);
}

function hasClick(e) {
  return database[e.id];
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
  for (var key in database) database[key] = false;
  isDoing = false;
  if (req) req.abort();
  $(".unread").css("opacity","0");
  $("#info-bar").html(" ");
  changStyle(".button", "blue");
  changStyle(".result", "gray");
}