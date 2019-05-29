$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
  });
  $("#add-category").on("click", function () {
    let category = ($("#category").val()).trim()
    console.log(category !== "")
    if (category !== "") {
      let formData = new FormData()
      formData.append("_csrf", $("input[name=_csrf]").val())
      formData.append("title", category)
      $.ajax({
        contentType: false,
        processData: false,
        method: "post",
        url: location.url,
        data: formData,
        beforeSend: function () {
          toastr.info("Đang gửi...", { timeOut: 0, extendedTimeOut: 0 })
        },
        success: function (response) {
          toastr.remove()
          console.log(response)
          if (response.message === "done") {
            toastr.success("Thêm thành công")
          } else {
            toastr.error("Lỗi")
          }
        }
      })
    } else {
      toastr.warning("Chưa điền tên thể loại")
    }
  })
})