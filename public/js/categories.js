$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr("content") }
  });

  const csrfToken = $('meta[name="_csrf"]').attr("content")
  const url = "http://localhost:8080"
  // Vuejs Zone
  new Vue({
    el: "#content",
    data: {
      searchText: "",
      addText: "",
      listCategories: [],
      selectedData: [],
    },
    methods: {
      addCategory: function() {
        $.ajax({
          method: "post",
          url: url + "/admin/categories",
          data: {
            _csrf: csrfToken,
            title: this.addText
          }
        })
        .done((res, textStatus, xhr) => {
          if (xhr.status == 201) {
            toastr.success(res.message)
          } else {
            toastr.error(res.message)
          }
          this.addText = ""
          this.loadCategories()
        })
      },
      clickDelete: function(id) {
        $.ajax({
          method: "delete",
          url: `${url}/admin/categories/${id}`,
          data: {
            _csrf: csrfToken
          },
        })
        .done((res, textStatus, xhr) => {
          if (xhr.status == 200) {
            toastr.success(res.message)
          } else {
            toastr.error(res.message)
          }
          this.loadCategories()
        })
      },
      loadCategories:  function() {
        $.ajax({
          method: "get",
          url: url + "/admin/data-categories",
        })
        .done(res => {
          this.listCategories = res.results
        })
      }
    },
    beforeCreate: function() {
      $.ajax({
        method: "get",
        url: url + "/admin/data-categories",
      })
      .done(res => {
        this.listCategories = res.results
      })
    },
    computed: {
      searchResult: function() {
        return this.listCategories.filter(item => item.title.indexOf(this.searchText) > -1)
      }
    }
  })
})