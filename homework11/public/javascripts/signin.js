function setHint(that, content) {
  $(that).prev().children().text(content).show();
}

$(".submit").click(function(event) {
  event.preventDefault();
  var isOK = true;
  $(".input").each(function(index,elem) {
    if (!$(elem).val()) {
      isOK = false;
      setHint(elem, "不可为空");
    } else {
      setHint(elem, "");
    }
  });

  if (isOK) {
    var user = {
      username: $("#username").val(),
      password: getSHA512($("#password").val())
    };
    $.post("/", user).then(obj=> {
      if (obj.path) {
        location.href = obj.path;
      } else {
        showErr(obj.error);
      }
    }).catch(error=>showErr("网络不佳, 请刷新重试"));
  }
});

function getSHA512(text) {
  var shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(text);
  var hash = shaObj.getHash("HEX");
  return hash;
}
