console.log("welcome to photohunt");

  var photoHunt = [
      {
      level: "three",
      xcoords: [245, 355, 20, 110],
      ycoords: [215, 63, 360, 73],
      circleWidth: [60,50,70,40],
      circleHeight: [60,50,70,40],
      imageA: "../PhotoHunt/images/arcadea.jpg",
      imageB: "../PhotoHunt/images/arcadeb.jpg",
      timerLength: 20000
      },
      {
      level: "one",
      xcoords: [92, 410, 160, 230],
      ycoords: [375, 190, 265, 139],
      circleWidth: [40,40,70,40],
      circleHeight: [40,40,70,40],
      imageA: "../PhotoHunt/images/owla.jpg",
      imageB: "../PhotoHunt/images/owlb.jpg",
      timerLength: 20000
      },
      {
      level: "two",
      xcoords: [82, 303, 230, 210],
      ycoords: [258, 236, 255, 142],
      circleWidth: [30,30,30,40],
      circleHeight: [30,30,30,40],
      imageA: "../PhotoHunt/images/generalassemblya.jpg",
      imageB: "../PhotoHunt/images/generalassemblyb.jpg",
      timerLength: 17000
      },
      {
      level: "three",
      xcoords: [3, 25, 225, 400],
      ycoords: [185, 65, 250, 408],
      circleWidth: [80,90,100,50],
      circleHeight: [80,90,100,50],
      imageA: "../PhotoHunt/images/tacoa.jpg",
      imageB: "../PhotoHunt/images/tacob.jpg",
      timerLength: 15000
      },
      {
      level: "four",
      xcoords: [50, 355, 181, 23],
      ycoords: [336, 198, 332, 13],
      circleWidth: [50,35,30,50],
      circleHeight: [50,35,30,50],
      imageA: "../PhotoHunt/images/miamia.jpg",
      imageB: "../PhotoHunt/images/miamib.jpg",
      timerLength: 13000
      }
    ]

  var score;
  var gameLevel = 0;
  var clickCounts = 0;
  var correctClickCounts = 0;
  var clickDifference = 0;
  var timeRemaining;

  // Initialize the Game
  photoHunt.initGame = function(){
    var scope = this;
    $('#start-screen').click(function(e){
      scope.startGame(0);
    });
  }

  // When user is ready, the game begins
  photoHunt.startGame = function(level){
    photoHunt.setScore();
    $('#start-screen').remove();
    $('footer').css('visibility', 'visible');
    $('nav').css('visibility', 'visible');
    $('.container').css('visibility', 'visible');
    photoHunt.setScore();
    photoHunt.setImages(level);
    photoHunt.setImageClickHandler();
    photoHunt.generateHiddenSpots(level);
    photoHunt.setTracker();
    photoHunt.setTimer(level);
    photoHunt.startTimer();
    photoHunt.setLevel(level);
  }

  // When user completes one level, next level begins
  photoHunt.startNextLevel = function(level){
    photoHunt.setImages(level);
    photoHunt.clearForNextLevel();
    photoHunt.generateHiddenSpots(level);
    photoHunt.setTracker();
    photoHunt.setTimer(level);
    photoHunt.startTimer();
    photoHunt.setLevel(level);
  }

  photoHunt.clearForNextLevel = function(){
    photoHunt.clearTracker();
    photoHunt.clearHiddenSpots();
    clickCounts = 0;
    correctClickCounts = 0;
    clickDifference = 0;
    timeRemaining = 0;
  }

// sets the score to 0
photoHunt.setScore = function(){
  score = 0;
  this.updateScore(score);
};

// updates the score in the footer
photoHunt.updateScore = function(score){
  $('#score').text("Score: " + score);
};

// updates the level in the footer
photoHunt.setLevel = function(level){
  var displayLevel = level + 1;
  $('#level').text("Level: " + displayLevel);
};

// sets image A and B for specified level
photoHunt.setImages = function(level){
  $('.photo-a').css('background-image', 'url(' + photoHunt[level].imageA + ')');
  $('.photo-b').css("background-image", 'url(' + photoHunt[level].imageB  + ')');
};

// generates circles with different classes
photoHunt.generateHiddenSpots = function(level){
    var xcoords = photoHunt[level].xcoords;
    var ycoords = photoHunt[level].ycoords;
    var width = photoHunt[level].circleWidth;
    var height = photoHunt[level].circleHeight;
    var $circles = $('.photo').append($('<div class="circle circle-a">').css({"left": xcoords[0] , "top": ycoords[0], "width": width[0], "height": height[0] }));
    var $circles = $('.photo').append($('<div class="circle circle-b">').css({"left": xcoords[1] , "top": ycoords[1], "width": width[1], "height": height[1] }));
    var $circles = $('.photo').append($('<div class="circle circle-c">').css({"left": xcoords[2] , "top": ycoords[2], "width": width[2], "height": height[2] }));
    var $circles = $('.photo').append($('<div class="circle circle-d">').css({"left": xcoords[3] , "top": ycoords[3], "width": width[3], "height": height[3] }));
    this.setCircleClickHandler();
}

// clears the circles for the next level
photoHunt.clearHiddenSpots = function(level){
    $('.circle').remove();
}

// allows image to be clicked, increase the number of click counts for each click
photoHunt.setImageClickHandler = function(){
  var scope = this;
  $('.photo').click(function(e){
    clickCounts++;
    incorrectClick = clickCounts - correctClickCounts; // is 0 if click was correct, is 1 if click was incorrect
    // if image was clicked but it was not a difference, decrease score by 15
    if (incorrectClick != 0){
      score = score - 15;
      scope.updateScore(score);
      clickCounts --;
    }
  });
};

// when a difference is clicked, circle in blue
  // score is upated by 100 points
  // the difference on other image is circled and it can no longer be clicked
photoHunt.setCircleClickHandler = function(){
  var scope = this;
  $('.circle-a').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-a').css("border", "solid #32d0ec");
    $('.circle-a').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-b').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-b').css("border", "solid #32d0ec");
    $('.circle-b').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-c').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-c').css("border", "solid #32d0ec");
    $('.circle-c').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-d').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-d').css("border", "solid #32d0ec");
    $('.circle-d').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
};

// set tracker in footer
photoHunt.setTracker = function(){
     $('.tracker-a').css("border","solid #F3F315");   // creates yellow tracker
     $('.tracker-b').css("border","solid #32d0ec");   // creates blue tracker
     $('.tracker-c').css("border","solid #7c32ec");   // creates purple tracker
     $('.tracker-d').css("border","solid #F433FF");   // creates pink tracker
}

// clear tracker in footer
photoHunt.clearTracker = function(){
    $('.tracker').css("background","white");
}

// updates tracker in footer
photoHunt.updateTracker = function(){
  var scope = this;
  if (correctClickCounts < 1){
    $('.tracker').css("background","white");
  }
  else if (correctClickCounts < 2){
    $('.tracker-a').css("background","#F3F315");
  }
  else if (correctClickCounts < 3){
    $('.tracker-b').css("background","#32d0ec");
  }
  else if (correctClickCounts < 4){
    $('.tracker-c').css("background","#7c32ec");
  }
  // when all differences have been clicked,
  else if (correctClickCounts == 4){
    gameLevel ++;
    $('.tracker-d').css("background","#F433FF");
    $("#timer").circletimer("pause");
    score = score + parseInt(timeRemaining/100);  //increase score by remaining time
    this.updateScore(score);
    if (gameLevel === 5){
      swal({
        title: "YOU WON!",
        text: "Your score is " + score + ". Do you want to play again?",
      }, function(){ window.location.reload();
                  });
    }
    else {
      swal({
        title: "CONGRATULATIONS!",
        text: "You completed LEVEL " + gameLevel + ". Are you ready for the next level?",
      }, function(){ scope.startNextLevel(gameLevel);
                  });
    }
  }
}

// set the timer for each level
photoHunt.setTimer = function (level){
  var timeLength = photoHunt[level].timerLength;
  $("#timer").circletimer({
    timeout: timeLength,
    onComplete: (function() {
      swal({
        title: "Time is up...",
        text: "Do you want to try again?",
      }, function(){  window.location.reload();
                   });
    }),
    onUpdate: (function(elapsed) {
      timeRemaining = timeLength - (Math.round(elapsed));
      if ((timeRemaining < 5000) && (timeRemaining > 4980)){
        console.log("time is running out!");
      //  setInterval(function(){
      //    $('#timer').toggleClass('timer-blink-black');}, 500);
      }
    })
  });
}

// start the timer for each level
photoHunt.startTimer = function(){
  $("#timer").circletimer("start");
}



// ********************************

$(document).ready(function(){
 photoHunt.initGame();
});
