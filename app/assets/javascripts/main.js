var ready = function(){
  questionFormClickListener();
  answerFormClickListener();
};

$(document).on('ready', ready);
$(document).on('page:load', ready);
