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
        $('form')[0].reset();
      },
      failure: function(){
        console.log("ERRORS!");
      },
    })
  });

};

var deleteButtonListener = function(){
  $('.questions').on('click', 'button.delete_button', function(e){
    e.preventDefault();
     var questionID = $(this).closest('li').attr('id');
    $.ajax({
      url: '/questions/' + questionID,
      type: "POST",
      data: {"_method":"delete"},
      success: function(){
        $('#'+questionID).remove();
      },
    });
  });
};

var deleteAnswerButtonListener = function(){
  $('.answers').on('click', 'button.delete_button', function(e){
    e.preventDefault();
     var answerID = $(this).closest('li').attr('id');
    $.ajax({
      url: '/answers/' + answerID,
      type: "POST",
      data: {"_method":"delete"},
      success: function(){
        $('#'+answerID).remove();
      },
    });
  });
};

var upvoteButtonListener = function(){
  $('.questions').on('click', 'button.upvote', function(e){
    e.preventDefault();
    var questionID = $(this).closest('li').attr('id');
    $.ajax({
      url: "/questions/" + questionID + '/upvote',
      type: "POST",
      data: {questions: questionID},
      success: function(response){
        $('#'+questionID).find('.total_votes').html(response['votes']);
      },
    });
  });
};

var upvoteAnswerButtonListener = function(){
  $('.answers').on('click', 'button.upvote', function(e){
    e.preventDefault();
    var answerID = $(this).closest('li').attr('id');
    $.ajax({
      url: "/answers/" + answerID + '/upvote',
      type: "POST",
      data: {answers: answerID},
      success: function(response){
        $('#'+answerID).find('.total_votes').html(response['votes']);
      },
    });
  });
};

var downvoteButtonListener = function(){
  $('.questions').on('click', 'button.downvote', function(e){
    e.preventDefault();
    var questionID = $(this).closest('li').attr('id');
    $.ajax({
      url: "/questions/" + questionID + '/downvote',
      type: "POST",
      data: {questions: questionID},
      success: function(response){
        $('#'+questionID).find('.total_votes').html(response['votes']);
      },
    });
  });
};

var downvoteAnswerButtonListener = function(){
  $('.answers').on('click', 'button.downvote', function(e){
    e.preventDefault();
    var answerID = $(this).closest('li').attr('id');
    $.ajax({
      url: "/answers/" + answerID + '/downvote',
      type: "POST",
      data: {answers: answerID},
      success: function(response){
        $('#'+answerID).find('.total_votes').html(response['votes']);
      },
    });
  });
};

var initListeners = function(){
  questionFormClickListener();
  answerFormClickListener();
  deleteButtonListener();
  upvoteButtonListener();
  downvoteButtonListener();
  deleteAnswerButtonListener();
  upvoteAnswerButtonListener();
  downvoteAnswerButtonListener();
};