$(".logout").click(function () {
  $.post("/logout")
  .then((obj)=>location.href=obj.path)
  .catch(e=>location.href="/");
});