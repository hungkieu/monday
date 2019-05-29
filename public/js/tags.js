$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
  });
  $("#add-tag").on("click", function () {
    let tag = ($("#tag-name").val()).trim()
    if (tag !== "") {
      let formData = new FormData()
      formData.append("_csrf", $("input[name=_csrf]").val())
      formData.append("title", tag)
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
          if (response.message === "done") {
            toastr.success("Thêm thành công")
          } else {
            toastr.error("Lỗi")
          }
        }
      })
    } else {
      toastr.warning("Chưa điền tên tag")
    }
  })
})