var questionFormClickListener = function(){
  $('input.question.new_form').on('click', function(e){
    e.preventDefault();
    //data received from form
    var title    = $('#question_title').val();
    var content  = $('#question_content').val();
    var formData = {question: {title: title, content: content}}
    ////////////////////////
    //HANDLEBAR TEMPLATE for question
    var source   = $(".question_template").html();
    var template = Handlebars.compile(source);
    //////////////////////

    $.ajax({
      url: "/questions",
      type: "POST",
      data: formData,
      success: function(response){
        var html = template({question: response});
        $('.questions').prepend(html);
        $('form')[0].reset();
      },
      failure: function(){
        console.log("ERRORS!")
      },
    });

  });

};

var answerFormClickListener = function(){
  $('input.answer.new_form').on('click', function(e){
    e.preventDefault();

    //data received from form
    var title    = $('#answer_title').val();
    var content  = $('#answer_content').val();
    var formData = {answer: {title: title, content: content}}
    var questionID = $('#question_id').attr("value");
    ///////////////

    //HANDLEBAR TEMPLATE for question
    var source = $('.answer_template').html();
    var template = Handlebars.compile(source);
    ////////////////////////

    $.ajax({
      url: "/questions/" + questionID + "/answers",
      type: "POST",
      data: formData,
      success: function(response){
        var html = template({answer: response});
        $('.answers').prepend(html);
      },
      failure: function(){
        console.log("ERRORS!");
      },
    })
  });

};
