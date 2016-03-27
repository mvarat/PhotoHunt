console.log("welcome to photohunt");

  var photoHunt = {};

  var score;
  var level;

  var xcoords = [100, 420, 170];
  var ycoords = [380, 195, 275];
  var circleWidth = [30,30,50]
  var circleHeight = [30,30,50]
  var incorrectClickCounts = 0;
  var correctClickCounts = 0;

// sets the score to 0
photoHunt.setScore = function(){
  score = 0;
  this.updateScore(score);
};

// updates the score in the footer
photoHunt.updateScore = function(score){
  $('#score').text("Score: " + score);
};

photoHunt.setImage = function(level){

};


var generateHiddenSpots = function(){
  for (var i = 0; i < xcoords.length; i++ ){
    var $circles = $('.photo-a').append($('<div class="circle">').css({"left": xcoords[i] , "top": ycoords[i], "width": circleWidth[i], "height": circleHeight[i] }));
    var $circles = $('.photo-b').append($('<div class="circle">').css({"left": xcoords[i] , "top": ycoords[i], "width": circleWidth[i], "height": circleHeight[i] }));
   }
  setCircleClickHandler();
}

var setImageClickHandler = function(){
  $('.photo').click(function(e){
    incorrectClickCounts ++;
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);
    console.log("incorrect clicks = " + incorrectClickCounts);
  });
};

var setCircleClickHandler = function(){
  $('.circle').click(function(e){
    console.log("The circle was clicked!");
    $(this).css("border", "solid red");
    correctClickCounts ++;
    console.log("correct clicks = " + correctClickCounts);

  });
};


var setTimer = function (){

   $("#start").on("click", function() {
    console.log("start was clicked.");
    $("#timer").circletimer("start");
   })

   $("#timer").circletimer({
    onComplete: function() {
      alert("Time is up!");
    },
    timeout: 5000
  });


 $("#timer").circletimer({
   timeout: 10000,
   onComplete: (function() {}),
   onUpdate: (function() {})
 });


}

$(document).ready(function(){
 photoHunt.setScore();
 setImageClickHandler();
 generateHiddenSpots();
 setTimer();
 $("#timer").circletimer("start");



});
