$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
  });

  var toolbarOptions = {
    handlers: {
      'link': function (value) {
        if (value) {
          var href = prompt('Enter the URL', 'https://');
          this.quill.format('link', href);
          var range = quill.getSelection();
          this.quill.insertText(range.index, href, true);
        } else {
          this.quill.format('link', false);
        }
      }
    }
  }

  window.quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });

  // Tags
  let tagsName = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: '/admin/data-tags',
      filter: function (list) {
        return $.map(list, function (tagsname) {
          return { name: tagsname };
        });
      }
    }
  })
  tagsName.initialize()
  $("#tags").tagsinput({
    typeaheadjs: {
      name: 'tagsname',
      displayKey: 'name',
      valueKey: 'name',
      source: tagsName.ttAdapter(),
      autoSelect: false
    },
    maxTags: 5,
    maxChars: 10,
    trimValue: true,
    freeInput: true
  })

  // Categories
  $.ajax({
    type: "get",
    url: "/admin/data-categories",
    success: function (response) {
      const results = response.results
      console.log(results)
      let elements = `<option value="">Chọn một thể loại</option>`
      for (item of results) {
        console.log(item)
        elements += `<option value="${item._id}">${item.title}</option>`
      }
      $("#categories").html(elements)
    }
  })

  // Add post
  $("#add-post").on("click", function () {
    const title = $("#post-title").val()
    const content = quill.root.innerHTML;
    const tags = $("#tags").tagsinput("items")
    const category = $("#categories").val()
    console.log(category)
    if (title.trim() && content.trim() && category.trim()) {
      let formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("tags", tags)
      formData.append("category", category)
      formData.append("_csrf", $("input[name=_csrf]").val())
      $.ajax({
        method: "post",
        url: location.url,
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function () {
          toastr.info("Đang gửi...", { timeOut: 0, extendedTimeOut: 0 })
        },
        success: function (response) {
          console.log(response)
          toastr.remove()
          if (response.message === "done") {
            toastr.success("Thêm thành công")
          } else {
            toastr.error("Lỗi")
          }
        }
      })
    }
  })
})
