var Modal = {
  findVoteRouteAndData: function(voteObject){
    var voteType = voteObject.hasClass("upvote") ? "upvote" : "downvote";
    var voteFor = voteObject.hasClass("question") ? "questions" : "answers";
    var id = voteObject.parent().attr('id');
    var voteCount = parseInt(voteObject.siblings(".total_votes").html());
    return  {
      url:'/' + voteFor + '/' + id + "/" + voteType,
      sendData: {
        question: {
          id: id,
          votes: voteCount
        }
    },
  };
  },
};

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
    $('.vote').on('click', function(event) {
      event.preventDefault();
      ajaxInfo = Modal.findVoteRouteAndData($(this))
      $.ajax({
        url: ajaxInfo.url,
        type: 'post',
        data: ajaxInfo.sendData
      }).success(function(vote){
        $(".questions").find('#'+vote.id).find(".total_votes").html(vote.votes)
      }).fail(function () {
        console.log('something went wrong');
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
