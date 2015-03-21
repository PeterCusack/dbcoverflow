//=require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var ready = function(){
  initListeners();
};

$(document).on('ready', ready);
$(document).on('page:load', ready);
