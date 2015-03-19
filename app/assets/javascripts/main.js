var ready = function(){
  View.startListeners();
  View.startVoteListener();
}

$(document).ready(ready);
$(document).on('page:load', ready);
/////////////////// Handles all votes //////
var Model = {
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
  findVoteRouteAndDataForCreation: function(formObject){
    var formFor = $(formObject).hasClass("question") ? "question" : "answer";
    var title = $(formObject).find('#'+formFor+'_title').val();
    var content = $(formObject).find('#'+formFor+'_content').val();
    var question_id = formObject.find("#question_id").val();
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

var Helpers = {
  renderMarkdown: function(){

  },
};

var View = {
  startListeners: function(){
    $(".new_form").click(function(event){
      event.preventDefault();
      ajaxInfo = Model.findVoteRouteAndDataForCreation($(this.form))
      View.createQuestion();
    });
    $('.markdownify').click(function(event) {
      event.preventDefault();
      Helpers.renderMarkdown();
    });
  },

  createQuestion: function() {
    $.ajax({
      url: "/" + ajaxInfo.url,
      method: 'post',
      data: ajaxInfo.sendData
    }).done(function(dataResponse){
      console.log(dataResponse);
      Templates.question = Handlebars.compile($(".question_template").html());
      var html = Templates.question({question: dataResponse, answer: dataResponse});
      $("." + ajaxInfo.url).prepend(html);
      View.startVoteListener();
    });
  },

  startVoteListener: function(){
    $('.vote').on('click', function(event) {
      event.preventDefault();
      ajaxInfo = Model.findVoteRouteAndDataForVotes($(this));
      View.createVote();
   });
  },

  createVote: function() {
    $.ajax({
      url: ajaxInfo.url,
      type: 'post',
      data: ajaxInfo.sendData
    }).success(function(vote){
      $("." + ajaxInfo.voteFor).find('#'+vote.id).find(".total_votes").html(vote.votes)
    }).fail(function () {
      console.log('something went wrong');
    });
  }
};

Templates = {}


