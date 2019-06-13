$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
  });
  $("#add-category").on("click", function () {
    let category = ($("#category").val()).trim()
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

  // Vuejs Zone
  new Vue({
    el: "#list-category",
    data: {
      searchText: "",
      url: "http://localhost:8080/admin/search-categories",
      listCategories: [],
      selectedData: []
    },
    methods: {
      clickDelete: (id) => {
        $.ajax({
          method: "delete",
          url: `http://localhost:8080/admin/categories/${id}`,
          data: {
            _csrf: $("input[name=_csrf]").val()
          },
          success: res => {
            console.log(res)
            this.loadCategories()
          }
        })
      },
      loadCategories: () => {
        $.ajax({
          method: "get",
          url: "http://localhost:8080/admin/data-categories",
          success: res => {
            this.listCategories = res.results
          }
        })
      }
    },
    beforeCreate: function() {
      $.ajax({
        method: "get",
        url: "http://localhost:8080/admin/data-categories",
        success: res => {
          this.listCategories = res.results
        }
      })
    },
    watch: {
      searchText: function(value) {
        this.searchCategories()
      }
    }
  })
})