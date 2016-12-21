function setEffect(who, isInvalid, isInside, isHide) {
  $(who).prev().toggleClass("inside", isInside).children().hide();
}

$(".clear").click(function(){
  setEffect($(".input"), false, true, true);
});

function showErr(text) {
  $(".error").text(text);
}
