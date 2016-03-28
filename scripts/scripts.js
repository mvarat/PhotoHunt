console.log("welcome to photohunt");

  var photoHunt = [
      {
      level: "one",
      xcoords: [100, 420, 170, 230],
      ycoords: [380, 195, 275, 139],
      circleWidth: [30,30,50,40],
      circleHeight: [30,30,50,40],
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
      xcoords: [50, 355, 181, 23],
      ycoords: [336, 198, 332, 13],
      circleWidth: [50,35,30,50],
      circleHeight: [50,35,30,50],
      imageA: "../PHTest/images/miamia.jpg",
      imageB: "../PHTest/images/miamib.jpg",
      timerLength: 15000
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
      console.log("Let the game begin!");
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
    photoHunt.clearForNextLevel();
    photoHunt.setImages(level);
    photoHunt.setImageClickHandler();
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
  var imageUrlA = photoHunt[level].imageA;
  var imageUrlB = photoHunt[level].imageB;
  $('.photo-a').css('background-image', 'url(' + imageUrlA  + ')');
  $('.photo-b').css("background-image", 'url(' + imageUrlB  + ')');
};

// generates circles with different classes
photoHunt.generateHiddenSpots = function(level){
    var $circles = $('.photo').append($('<div class="circle circle-a">').css({"left": photoHunt[level].xcoords[0] , "top": photoHunt[level].ycoords[0], "width": photoHunt[level].circleWidth[0], "height": photoHunt[level].circleHeight[0], }));
    var $circles = $('.photo').append($('<div class="circle circle-b">').css({"left": photoHunt[level].xcoords[1] , "top": photoHunt[level].ycoords[1], "width": photoHunt[level].circleWidth[1], "height": photoHunt[level].circleHeight[1], }));
    var $circles = $('.photo').append($('<div class="circle circle-c">').css({"left": photoHunt[level].xcoords[2] , "top": photoHunt[level].ycoords[2], "width": photoHunt[level].circleWidth[2], "height": photoHunt[level].circleHeight[2], }));
    var $circles = $('.photo').append($('<div class="circle circle-d">').css({"left": photoHunt[level].xcoords[3] , "top": photoHunt[level].ycoords[3], "width": photoHunt[level].circleWidth[3], "height": photoHunt[level].circleHeight[3], }));

    this.setCircleClickHandler();
}

photoHunt.clearHiddenSpots = function(level){
    $('.circle').remove();
}

// allows image to be clicked, increase the number of click counts for each click
photoHunt.setImageClickHandler = function(){
  $('.photo').click(function(e){
    clickCounts ++;
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
    console.log("The circle A was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-a').css("border", "solid red");
    $('.circle-a').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-b').click(function(e){
    console.log("The circle B was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-b').css("border", "solid red");
    $('.circle-b').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-c').click(function(e){
    console.log("The circle C was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-c').css("border", "solid red");
    $('.circle-c').off('click');
    correctClickCounts ++;
    scope.updateTracker();
  });
  $('.circle-d').click(function(e){
    console.log("The circle D was clicked!");
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
    this.getTimerPoints();
    $('.tracker').css("background","red");
    $("#timer").circletimer("stop");
    gameLevel ++;
    alert("CONGRATS! You completed level " + gameLevel + ".");
    this.startNextLevel(gameLevel);
  }
}

// set the timer for each level
photoHunt.setTimer = function (level){
  var timeLength = photoHunt[level].timerLength;
  $("#timer").circletimer({
    timeout: timeLength,
    onComplete: (function() {
      alert("Time is up!  You LOSE.")
    }),
    onUpdate: (function(elapsed) {
      var timeRemaining = timeLength - (Math.round(elapsed));
//     console.log("Time Remaining: "  + timeRemaining);
    })
  });
}

// returns time left on timer
photoHunt.getTimerPoints = function(){
  // $("#timer").circletimer({
  //    onUpdate: (function(elapsed) {
  //      console.log("Time elapsed: " + (Math.round(elapsed)));
  //   })
  // });
}

// start the timer for each level
photoHunt.startTimer = function(){
  $("#timer").circletimer("start");
}

// ********************************

$(document).ready(function(){
 photoHunt.initGame();
});
