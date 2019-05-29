$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $("input[name=_csrf]").val() }
  });
  let simplemde = new SimpleMDE({
    element: $("#post")[0],
    blockStyles: {
      bold: "__",
      italic: "_"
    },
    forceSync: true,
    indentWithTabs: false,
    insertTexts: {
      horizontalRule: ["", "\n\n-----\n\n"],
      image: ["![](http://", ")"],
      link: ["[", "](http://)"],
      table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    lineWrapping: false,
    placeholder: "Nội dung bài viết...",
    previewRender: function (plainText) {
      return customMarkdownParser(plainText)
    },
    previewRender: function (plainText, preview) {
      setTimeout(function () {
        preview.innerHTML = customMarkdownParser(plainText)
      }, 250);
      return "Loading..."
    },
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    },
    showIcons: ["code", "table"],
    styleSelectedText: false,
    tabSize: 2,
  })

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
    const content = simplemde.value()
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