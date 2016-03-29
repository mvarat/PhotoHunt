console.log("welcome to photohunt");

  var photoHunt = [
      {
      level: "one",
      xcoords: [92, 410, 160, 230],
      ycoords: [375, 190, 265, 139],
      circleWidth: [40,40,70,40],
      circleHeight: [40,40,70,40],
      imageA: "../PHTest/images/owla.jpg",
      imageB: "../PHTest/images/owlb.jpg",
      timerLength: 20000
      },
      {
      level: "two",
      xcoords: [82, 303, 230, 210],
      ycoords: [258, 236, 255, 142],
      circleWidth: [30,30,30,40],
      circleHeight: [30,30,30,40],
      imageA: "../PHTest/images/generalassemblya.jpg",
      imageB: "../PHTest/images/generalassemblyb.jpg",
      timerLength: 17000
      },
      {
      level: "three",
      xcoords: [3, 25, 225, 400],
      ycoords: [185, 65, 250, 408],
      circleWidth: [80,90,100,50],
      circleHeight: [80,90,100,50],
      imageA: "../PHTest/images/tacoa.jpg",
      imageB: "../PHTest/images/tacob.jpg",
      timerLength: 15000
      },
      {
      level: "four",
      xcoords: [50, 355, 181, 23],
      ycoords: [336, 198, 332, 13],
      circleWidth: [50,35,30,50],
      circleHeight: [50,35,30,50],
      imageA: "../PHTest/images/miamia.jpg",
      imageB: "../PHTest/images/miamib.jpg",
      timerLength: 13000
      }
    ]

  var score;
  var gameLevel = 0;
  var clickCounts = 0;
  var correctClickCounts = 0;

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
  }

  // When user completes one level, next level begins
  photoHunt.startNextLevel = function(level){
    photoHunt.setImages(level);
    photoHunt.clearForNextLevel();
    photoHunt.generateHiddenSpots(level);
    photoHunt.setTracker();
    photoHunt.setTimer(level);
    photoHunt.startTimer();
  }

  photoHunt.clearForNextLevel = function(){
    photoHunt.clearTracker();
    photoHunt.clearHiddenSpots();
    clickCounts = 0;
    correctClickCounts = 0;
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
  var clickDifference;
  $('.photo').click(function(e){
    clickCounts ++;
    clickDifference = clickCounts -
    console.log("Total Clicks = " + clickCounts + ", Correct Clicks = " + correctClickCounts);
    // if total clicks > correct clicks, decrease time on timer!!!!!

  });
};

// when a difference is clicked, circle in red
  // score is upated by 100 points
  // the difference on other image is circled and it can no longer be clicked
photoHunt.setCircleClickHandler = function(){
  var scope = this;
  $('.circle-a').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-a').css("border", "solid red");
    $('.circle-a').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-b').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-b').css("border", "solid red");
    $('.circle-b').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-c').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-c').css("border", "solid red");
    $('.circle-c').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-d').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-d').css("border", "solid red");
    $('.circle-d').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
};

// set tracker in footer
photoHunt.setTracker = function(){
    $('.tracker').css("border","solid red");
}

// clear tracker in footer
photoHunt.clearTracker = function(){
    $('.tracker').css("background","white");
}

// updates tracker in footer
photoHunt.updateTracker = function(){
  var scope = this;
  if (correctClickCounts == 0){
    $('.tracker').css("background","white");
  }
  else if (correctClickCounts == 1){
    $('.tracker-a').css("background","red");
  }
  else if (correctClickCounts == 2){
    $('.tracker-a').css("background","red");
    $('.tracker-b').css("background","red");
  }
  else if (correctClickCounts == 3){
    $('.tracker-a').css("background","red");
    $('.tracker-b').css("background","red");
    $('.tracker-c').css("background","red");
  }
  else if (correctClickCounts == 4){
    gameLevel ++;
    $('.tracker').css("background","red");
    $("#timer").circletimer("stop");
    if (gameLevel === 4){
      swal("YOU WON!", "Your score is " + score + ".");
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
      }, function(){  photoHunt.initGame();
                   });
    }),
    onUpdate: (function(elapsed) {
      var timeRemaining = timeLength - (Math.round(elapsed));
//      console.log("Time Remaining: "  + timeRemaining);
    })
  });
}

// start the timer for each level
photoHunt.startTimer = function(){
  $("#timer").circletimer("start");
}

// returns time left on timer
photoHunt.getTimerPoints = function(){
  // $("#timer").circletimer({
  //    onUpdate: (function(elapsed) {
  //      console.log("Time elapsed: " + (Math.round(elapsed)));
  //   })
  // });
}


// ********************************

$(document).ready(function(){
 photoHunt.initGame();
});
