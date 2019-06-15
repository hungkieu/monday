$(document).ready(function () {
  $.ajaxSetup({
    headers: { 'CSRF-Token': $("meta[name=_csrf]").attr('content') }
  });

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image']
  ]

  let BlockEmbed = Quill.import('blots/block/embed');

  class ImageBlot extends BlockEmbed {
    static create(value) {
      let node = super.create();
      Object.keys(value).forEach((attr) => {
        node.setAttribute(attr, value[attr]);
      });
      return node;
    }

    static value(node) {
      var attrs = node.attributes;
      var output = {};
      for(var i = attrs.length - 1; i >= 0; i--) {
        output[attrs[i].name] = attrs[i].value;
      }
      output;
      return output;
    }
  }
  ImageBlot.blotName = 'image';
  ImageBlot.tagName = 'img';

  Quill.register(ImageBlot);

  window.quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });

  var toolbar = quill.getModule('toolbar');
  toolbar.addHandler('image', function() {
    var range = quill.getSelection();
    var href = prompt('Image URL', 'https://');
    this.quill.insertEmbed(range.index, 'image', {src: href, width: '100px', height: '100px'});
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
        .done(res => {
          console.log(res)
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

  // Categories
  // $.ajax({
  //   type: "get",
  //   url: "/admin/data-categories",
  //   success: function (response) {
  //     const results = response.results
  //     console.log(results)
  //     let elements = `<option value="">Chọn một thể loại</option>`
  //     for (item of results) {
  //       console.log(item)
  //       elements += `<option value="${item._id}">${item.title}</option>`
  //     }
  //     $("#categories").html(elements)
  //   }
  // })

  // // Add post
  // $("#add-post").on("click", function (e) {
  //   e.preventDefault();
  //   const title = $("#post-title").val()
  //   const content = quill.root.innerHTML;
  //   const category = $("#categories").val()
  //   console.log(content)
  //   if (title.trim() && content.trim() && category.trim()) {
  //     let formData = new FormData()
  //     formData.append("title", title)
  //     formData.append("content", content)
  //     formData.append("category", category)
      // $.ajax({
      //   method: "post",
      //   url: location.url,
      //   contentType: false,
      //   processData: false,
      //   data: formData,
      //   beforeSend: function () {
      //     toastr.info("Đang gửi...", { timeOut: 0, extendedTimeOut: 0 })
      //   },
      //   success: function (response) {
      //     toastr.remove()
      //     if (response.message === "done") {
      //       toastr.success("Thêm thành công")
      //     } else {
      //       toastr.error("Lỗi")
      //     }
      //   }
      // })
  //   }
  // })
})
