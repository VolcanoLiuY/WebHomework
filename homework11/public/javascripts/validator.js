var validator = {
  check(field, content) {
    return this[field](content);
  },
  username(username) {
    if (!username)
      return "不可为空";
    else if (/[^a-zA-Z]/.test(username[0]))
      return "只能以字母开头";
    else if (/[^a-zA-Z0-9_]/.test(username))
      return "只能包含字母, 数字和下划线";
    else if (username.length < 6 || username.length > 18)
      return "长度必须为6到18位";
    else return "";
  },
  password(password) {
    if (!password)
      return "不可为空";
    else if (/[^a-zA-Z0-9_\-]/.test(password))
      return "只能包含字母, 数字, 下划线和中划线";
    else if (password.length < 6 || password.length > 12)
      return "长度必须为6到12位";
    else return "";
  },
  sid(sid) {
    if (!sid)
      return "不可为空";
    else if (sid[0] === "0")
      return "不能以0开头";
    else if (/[^0-9]/.test(sid))
      return "只能包含数字";
    else if (sid.length !== 8)
      return "长度必须为8位";
    else return "";
  },
  phone(phone) {
    if (!phone)
      return "不可为空";
    else if (phone[0] === "0")
      return "不能以0开头";
    else if (/[^0-9]/.test(phone))
      return "只能包含数字";
    else if (phone.length !== 11)
      return "长度必须为11位";
    else return "";
  },
  email(email) {
    if (!email)
      return "不可为空";
    else if(!/^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)?@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+$/.test(email))
      return "邮箱格式错误";
    else return "";
  }
};


if(typeof module !== "undefined") {
  validator.password = function (password){
    if (password.length !== 128)
      return "加密发生未知错误";
    else if (password==="cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e")
      return "不可为空";
    else return "";
  };
  module.exports = validator;
}
