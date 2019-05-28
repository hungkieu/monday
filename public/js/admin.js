$(document).ready(function() {
  $(".collapse-menu").on("click", "button", function() {
    let collapse = $(this).parents(".collapse-menu").find("ul")
    if (collapse.hasClass("dropdown")) {
      collapse.removeClass("dropdown")
    } else {
      collapse.addClass("dropdown")
    }
  })
})