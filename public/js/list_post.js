$(document).ready(function() {
  $("body").on("click", "#view-post", function(e) {
    e.preventDefault()
    let dataElement = $(this).data("id")
    console.log(dataElement)
    $.ajaxSetup({
      headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
    });
    let formData = new FormData()
    formData.append("_csrf", $("input[name=_csrf]").val())
    formData.append("idPost", dataElement)
    $.ajax({
      contentType: false,
      processData: false,
      method: "post",
      ulr: location.url,
      data: formData,
      success: function(response) {
        console.log(response)
        $("#post").html(marked(response.content))
      }
    })
  })
})