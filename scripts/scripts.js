console.log("welcome to photohunt");

  // sets the levels for the game
  var photoHunt = [
      {
      level: "one",
      xcoords: [90, 400, 160, 225],
      ycoords: [370, 185, 265, 134],
      circleWidth: [50,50,70,50],
      circleHeight: [50,50,70,50],
      imageA: "../PhotoHunt/images/owla.jpg",
      imageB: "../PhotoHunt/images/owlb.jpg",
      timerLength: 20000
      },
      {
      level: "two",
      xcoords: [220, 355, 42, 196],
      ycoords: [405, 315, 208, 8],
      circleWidth: [40,80,40,50],
      circleHeight: [40,80,40,50],
      imageA: "../PhotoHunt/images/taja.jpg",
      imageB: "../PhotoHunt/images/tajb.jpg",
      timerLength: 20000
      },
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
      level: "four",
      xcoords: [78, 298, 225, 205],
      ycoords: [253, 231, 250, 138],
      circleWidth: [40,40,40,50],
      circleHeight: [40,40,40,50],
      imageA: "../PhotoHunt/images/generalassemblya.jpg",
      imageB: "../PhotoHunt/images/generalassemblyb.jpg",
      timerLength: 20000
      },
      {
      level: "five",
      xcoords: [3, 25, 225, 400],
      ycoords: [185, 65, 250, 408],
      circleWidth: [80,90,100,50],
      circleHeight: [80,90,100,50],
      imageA: "../PhotoHunt/images/tacoa.jpg",
      imageB: "../PhotoHunt/images/tacob.jpg",
      timerLength: 20000
      },
      {
      level: "six",
      xcoords: [50, 355, 181, 23],
      ycoords: [336, 198, 332, 13],
      circleWidth: [50,35,30,50],
      circleHeight: [50,35,30,50],
      imageA: "../PhotoHunt/images/miamia.jpg",
      imageB: "../PhotoHunt/images/miamib.jpg",
      timerLength: 20000
      }
    ]

  var score;  // player's score
  var gameLevel = 0;  // this is game level that has been completed, add one for actual game level
  var clickCounts = 0; // number of times the player has clicked on an image, resets at each level
  var correctClickCounts = 0; // number of times the player has clicked on a difference, resets at each level
  var clickDifference = 0;  // determines whether or not the click was a success (0 for correct click, 1 for incorrect click)
  var timeRemaining;  // time remaining on the clock for each level
  var hintsLeft = 3;  // number of hints left for the entire game

  var aIsClicked = false;  // if difference a is clicked will be true
  var bIsClicked = false;  // if difference b is clicked will be true
  var cIsClicked = false;  // if difference d is clicked will be true
  var dIsClicked = false;  // if difference d is clicked will be true

  // Initialize the game, displays start screen, when clicked, start game at level 1
  photoHunt.initGame = function(){
    var scope = this;
    $('#start-screen').click(function(e){
      scope.startGame(0);
    });
  }

  // When user is ready, the game begins at level 1
  photoHunt.startGame = function(level){
    $('#start-screen').remove();
    $('body').css('overflow','auto');
    $('footer').css('visibility', 'visible');
    $('nav').css('visibility', 'visible');
    $('.container').css('visibility', 'visible');
    this.setScore();  // sets score to 0
    this.setImages(level);  // loads images for level 1
    this.setImageClickHandler();  // sets click handler on images
    this.generateHiddenSpots(level);  // generates hidden spots for level 1
    this.setTracker();  // loads tracker in the footer
    this.setTimer(level);  // sets timer for level 1
    this.startTimer();  // starts timer
    this.setLevel(level);  // sets level number in footer
    this.setHintClickHandler();  // sets hints available in footer
  }

  // When user completes level, next level begins
  photoHunt.startNextLevel = function(level){
    this.clearForNextLevel();  // clear previous level variables
    this.setImages(level);  // set images for next level
    this.generateHiddenSpots(level);  // generate hidden spots for next level
    this.setTracker();  // reset tracker for level
    this.setTimer(level);  // reset timer for level
    this.startTimer();  // start timer
    this.setLevel(level);  // sets level number in footer
  }

  // before next level starts, clear previous level variables
  photoHunt.clearForNextLevel = function(){
    this.clearTracker();
    this.clearHiddenSpots();
    this.setIsClicked();
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

// sets if spot is clicked to false for new level
photoHunt.setIsClicked = function(){
  aIsClicked = false;
  bIsClicked = false;
  cIsClicked = false;
  dIsClicked = false;
}

// sets image A and B for specified level
photoHunt.setImages = function(level){
  $('.photo-a').css('background-image', 'url(' + photoHunt[level].imageA + ')');
  $('.photo-b').css("background-image", 'url(' + photoHunt[level].imageB  + ')');
};

// generates hidden circles with different classes for the level
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
    // if image was clicked but it was not a difference, decrease score by 15, then make even again
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
  // is clicked is set to true so hint will not be given for that spot
photoHunt.setCircleClickHandler = function(){
  var scope = this;
  $('.circle-a').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-a').css("border", "solid #32d0ec");
    $('.circle-a').off('click');
    correctClickCounts ++;
    scope.updateTracker();
    aIsClicked = true;
  });
  $('.circle-b').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-b').css("border", "solid #32d0ec");
    $('.circle-b').off('click');
    correctClickCounts ++;
    scope.updateTracker();
    bIsClicked = true;
  });
  $('.circle-c').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-c').css("border", "solid #32d0ec");
    $('.circle-c').off('click');
    correctClickCounts ++;
    scope.updateTracker();
    cIsClicked = true;
  });
  $('.circle-d').click(function(e){
    score = score + 100;
    scope.updateScore(score);
    $('.circle-d').css("border", "solid #32d0ec");
    $('.circle-d').off('click');
    correctClickCounts ++;
    scope.updateTracker();
    dIsClicked = true;
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

// updates tracker in footer, fills in next tracker spot when new difference is clicked
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
  // when all differences have been clicked, level is completed
  else if (correctClickCounts == 4){
    gameLevel ++;
    $('.tracker-d').css("background","#F433FF");
    $("#timer").circletimer("pause");
    score = score + parseInt(timeRemaining/100);  //increase score by remaining time
    this.updateScore(score);
    // if all levels have been completed, dispay final score, ask user to play again
    if (gameLevel === this.length){
      swal({
        title: "YOU WON!",
        text: "Your score is " + score + ". Do you want to play again?",
      }, function(){ window.location.reload();
                  });
    }
    // ask player if they are ready to play the next level, then start next level
    else {
      swal({
        title: "CONGRATULATIONS!",
        text: "You completed LEVEL " + gameLevel + ". Are you ready for the next level?",
      }, function(){ scope.startNextLevel(gameLevel);
                  });
    }
  }
}

// sets up hints in footer (3 per game)
// when hint is clicked, remove hint and give a circle away
photoHunt.setHintClickHandler = function(){
  var scope = this;
  $('.hint').click(function(e){
    clickCounts++;
    correctClickCounts++;
    if (hintsLeft == 3){
      $('.hint-c').remove();
    }
    else if (hintsLeft == 2){
      $('.hint-b').remove();
    }
    else if (hintsLeft == 1){
      $('.hint-a').remove();
      $('#hint-text').text("YOU ARE ON YOUR OWN");
    }
    scope.giveHint();
    hintsLeft--;
    scope.updateTracker();
  });
}

// finds a difference which has not been clicked and shows it to the player
photoHunt.giveHint = function(){
   if (aIsClicked == false){
      aIsClicked = true;
      $('.circle-a').css("border", "solid #32d0ec");
      $('.circle-a').off('click');
   }
   else if (bIsClicked == false){
      bIsClicked = true;
      $('.circle-b').css("border", "solid #32d0ec");
      $('.circle-b').off('click');
   }
   else if (cIsClicked == false){
      cIsClicked = true;
      $('.circle-c').css("border", "solid #32d0ec");
      $('.circle-c').off('click');
   }
   else if (dIsClicked == false){
      dIsClicked = true;
      $('.circle-d').css("border", "solid #32d0ec");
      $('.circle-d').off('click');
   }
}

// set the timer for each level
photoHunt.setTimer = function (level){
  $('#timer').css('border', 'solid black');
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
      // when time is running out, blick border...
      if ((timeRemaining < 5000) && (timeRemaining > 4980)){
        console.log("time is running out!");
          $('#timer').css('border', 'solid red');
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
