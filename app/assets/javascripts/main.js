
/////////////////// Handles all votes //////
var Modal = {
  findVoteRouteAndDataForVotes: function(voteObject){
    var voteType = voteObject.hasClass("upvote") ? "upvote" : "downvote";
    var voteFor = voteObject.hasClass("question") ? "questions" : "answers";
    var id = voteObject.parent().attr('id');
    var voteCount = parseInt(voteObject.siblings(".total_votes").html());
    var sendData = {};
    sendData[voteFor] = {
        id: id,
        votes: voteCount
      };
    var ajaxInfo = {
      voteFor: voteFor,
      url:'/' + voteFor + '/' + id + "/" + voteType,
    };
    ajaxInfo['sendData'] = sendData;
    return ajaxInfo;
  },

/////////////////// Handles all creation //////
  findVoteRouteAndDataForCreation: function(formOject){
    var formFor = $(formOject).hasClass("question") ? "question" : "answer";
    // var question_id = question_id ? 
    var title = $(formOject).find('#'+formFor+'_title').val();
    var content = $(formOject).find('#'+formFor+'_content').val();
    var question_id = formOject.find("#question_id").val()
    var url = formFor + "s";
    var sendData = {question_id: question_id};
    sendData[formFor] =  {
          title: title,
          content: content
        };
      var ajaxInfo = {
      url: url,
      };
      ajaxInfo['sendData'] = sendData;
      return ajaxInfo;
  },

};

var View = {
  startListeners: function(){
    $(".new_form").click(function(event){
      event.preventDefault();
      ajaxInfo = Modal.findVoteRouteAndDataForCreation($(this.form))
      $.ajax({
        url: "/" + ajaxInfo.url,
        method: 'post',
        data: ajaxInfo.sendData
      }).success(function(dataResponse){
        Templates.question = Handlebars.compile($(".question_template").html());
        var html = Templates.question({question: dataResponse, answer: dataResponse});
        $("." + ajaxInfo.url).prepend(html);
        View.startVoteListener();
      });
    });

  },

  startVoteListener: function(){
    $('.vote').on('click', function(event) {
      event.preventDefault();
      ajaxInfo = Modal.findVoteRouteAndDataForVotes($(this))
      $.ajax({
        url: ajaxInfo.url,
        type: 'post',
        data: ajaxInfo.sendData
      }).success(function(vote){
        $("." + ajaxInfo.voteFor).find('#'+vote.id).find(".total_votes").html(vote.votes)
      }).fail(function () {
        console.log('something went wrong');
      });
   });
  }
};

Templates = {}

$(document).ready(function(){
  View.startListeners();
  View.startVoteListener();
})
