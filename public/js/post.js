$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'CSRF-Token': $("meta[name=_csrf]").attr('content') }
  });

  let easyMDE = new EasyMDE({element: $('#editor')[0]});
  // Vue zone
  const csrfToken = $('meta[name="_csrf"]').attr("content")
  const url = "http://localhost:8080"
  new Vue({
    el: "#post",
    data: {
      title: "",
      listCategories: [],
      category: ""
    },
    methods: {
      createPost: function() {
        console.log(quill.root.innerHTML)
        $.ajax({
          method: "post",
          url: url + "/admin/posts",
          data: {
            _csrf: csrfToken,
            title: this.title,
            content: quill.root.innerHTML,
            category: this.category
          }
        })
        .done((res, textStatus, xhr) => {
          if (xhr.status == 201) {
            toastr.success(res.message)
          } else {
            toastr.error(res.message)
          }
          this.title = ""
        })
      }
    },
    beforeCreate: function() {
      $.ajax({
        method: "get",
        url: url + "/admin/data-categories"
      })
      .done((res) => {
        this.listCategories = res.results
      })
    },
    watch: {
      title: function(value) {
        // console.log(value)
      },
      category: function(value) {
        // console.log(value)
      }
    }
  })
})
