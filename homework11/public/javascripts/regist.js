function checkField(field, content) {
  if (field === "repeat") {
    return new Promise(function (resolve, reject) {
      if (!content)
        reject(new Error("不可为空"));
      else if (content !== $("#password").val())
        reject(new Error("两次输入的密码不一致"));
      else
        resolve();
    });
  }
  else if (field === "password") {
    return new Promise(function (resolve, reject) {
      message = validator.check(field, content);
      if (message) reject(new Error(message));
      else resolve();
    });
  }
  return new Promise(function (resolve, reject) {
    message = validator.check(field, content);
    if (message) reject(new Error(message));
    else resolve();
  }).then(()=>$.post("/checkUnique", {field: field, content: content}))
  .then(function(data){
    return new Promise(function (resolve, reject){
      if (!data) resolve();
      else reject(new Error(data));
    });
  });
}

$(".submit").click(function(event) {
  event.preventDefault();

  var user = {};
  var isOk = true;

  $(".input").each(function(index, elem) {
    if ($(elem).nextAll(".ok").hasClass("hide")) {
      if (!$(elem).val())
        $(elem).blur();
      isOk = false;
    }
    user[$(elem).attr("name")] = $(elem).val();
  });

  if (isOk) {
    delete user.repeat;
    user.password = getSHA512(user.password);
    $.post("/regist", user).then(obj=> {
      if (obj.path) {
        location.href = obj.path;
      } else {
        showErr(obj.error);
      }
    }).catch(error=>showErr("网络不佳, 请刷新重试"));
  }
});

$(".input").blur(function() {
  checkField($(this).attr("name"), $(this).val())
  .then(()=>setEffect(this, false, !$(this).val(), false))
  .catch((e)=>{
    setEffect(this, true, !$(this).val(), true);
    $(this).prev().children().show().text(e.message||" ");
  });
  if ($(this).attr("name") === "password" && $("#repeat").val())
    $("#repeat").blur();
});

function getSHA512(text) {
  var shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(text);
  var hash = shaObj.getHash("HEX");
  return hash;
}