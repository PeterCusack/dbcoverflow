var questionFormClickListener = function(){
  $('input.new_form').on('click', function(e){
    e.preventDefault();
    var title    = $('#question_title').val();
    var content  = $('#question_content').val();
    var formData = {question: {title: title, content: content}}

    //HANDLEBAR TEMPLATE
    var source   = $(".question_template").html();
    var template = Handlebars.compile(source);
    //////////////////////

    $.ajax({
      url: "/questions",
      type: "POST",
      data: formData,
      success: function(response){
        console.log(response);
        var html = template({question: response});
        $('.questions').prepend(html);
      },
      failure: function(){
        console.log("ERRORS!")
      },
    });

  });

};
