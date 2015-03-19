var View = {
  startListeners: function(){
    $(".new_question_form").click(function(event){
      event.preventDefault();
      sendData = {
        question: {
          title: $(this.form).find('#question_title').val(),
          content: $(this.form).find('#question_content').val()
        }
      };
      $.ajax({
        url: '/questions',
        method: 'post',
        data: sendData
      }).success(function(question){
        var html = Templates.question({question: question});
        $(".questions").prepend(html);
        View.startVoteListener();
      });
    });
  },
  startVoteListener: function(){
    $('.upvote').on('click', function(event) {
      event.preventDefault();
      console.log("we're here");
      var voteCount = parseInt($('.total_votes').eq(0).html());
      var id = $(this).parent().attr('id');
      var url = '/questions/' + id
      voteCount ++;
      var sendData = {
        question: {
          id: id,
          votes: voteCount
        }
      };
    // var sendData = {upvote: voteCount};
      $.ajax({
        url: url,
        type: 'put',
        data: sendData
      }).success(function(vote){
        console.log("we're here too");
      }).fail(function () {
        console.log('some shit happened here');
      });
   });
  }
};

Templates = {}

$(document).ready(function(){
  Templates.question = Handlebars.compile($(".question_template").html());
  View.startListeners();
  View.startVoteListener();
})
