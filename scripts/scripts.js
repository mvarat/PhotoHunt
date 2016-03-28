console.log("welcome to photohunt");

  var photoHunt = {
    // {1:
    //   "level": "one",
    //   "xcoords": [100, 420, 170, 230],
    //   "ycoords": [380, 195, 275, 139],
    //   "circleWidth": [30,30,50,40];
    //   "circleHeight": [30,30,50,40];
    //   "imageA": "../PHTest/images/owla.jpg";
    //   "imageB": "../PHTest/images/owlb.jpg";
    //   "timerLength": 20000;
    // }
    //
    // {2:
    //   "level": "two",
    //   "xcoords": [[82, 303, 230, 210],
    //   "ycoords": [258, 236, 255, 142],
    //   "circleWidth": [30,30,30,40];
    //   "circleHeight": [30,30,30,40];
    //   "imageA": "../PHTest/images/generalasaemblya.jpg";
    //   "imageB": "../PHTest/images/generalassemblyb.jpg";
    //   "timerLength": 20000;
    // }

  };
  var score;
  var gameLevel = 1;

  var xcoords = [100, 420, 170, 230];
  var ycoords = [380, 195, 275, 139];
  var circleWidth = [30,30,50,40];
  var circleHeight = [30,30,50,40];
  var clickCounts = 0;
  var correctClickCounts = 0;

  // Initialize the Game
  photoHunt.initGame = function(){
  //var $start = $('.container').append($('<div class="start-screen">'));
  //var $startButton = $('.container').append($('<div class="start-button">'));
//  $start.text("Find the 4 differences in each picture.");
//  $('start-button').text("CLICK TO PLAY");
//   var scope = this;
//   $startButton.click(function(e){
//     scope.startGame();
//   });
  }

  // When user is ready, the game begins
  photoHunt.startGame = function(){
    photoHunt.setScore();
    photoHunt.setImageClickHandler();
    photoHunt.generateHiddenSpots();
    photoHunt.setTracker();
//    photoHunt.setImages(one);
    photoHunt.setImages();
    photoHunt.setTimer();
    photoHunt.startTimer();
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
  // var imageUrlA = this.getImageA(level);
  // var imageUrlB = this.getImageB(level);
  var imageUrlA = "../PHTest/images/owla.jpg";
  var imageUrlB = "../PHTest/images/owlb.jpg";
  $('.photo-a').css('background-image', 'url(' + imageUrlA  + ')');
  $('.photo-b').css("background-image", 'url(' + imageUrlB  + ')');
};

// gets image A for specified level
photoHunt.getImageA = function(level){
  var imageA;
  return imageA;
};

// gets image B for specified level
photoHunt.getImageA = function(level){
  var imageB;
  return imageB;
};

// // generates the circles where the differences are to be clicked
// photoHunt.generateHiddenSpots = function(level){
//   for (var i = 0; i < xcoords.length; i++ ){
//     var $circles = $('.photo').append($('<div class="circle">').css({"left": xcoords[i] , "top": ycoords[i], "width": circleWidth[i], "height": circleHeight[i], }));
// //    var $circles = $('.photo').append($('<div class="circle">').css({"left": xcoords[i] , "top": ycoords[i], "width": circleWidth[i], "height": circleHeight[i] }));
//    }
//   this.setCircleClickHandler();
// }

// generates circles with different classes
photoHunt.generateHiddenSpots = function(level){
    var $circles = $('.photo').append($('<div class="circle circle-a">').css({"left": xcoords[0] , "top": ycoords[0], "width": circleWidth[0], "height": circleHeight[0], }));
    var $circles = $('.photo').append($('<div class="circle circle-b">').css({"left": xcoords[1] , "top": ycoords[1], "width": circleWidth[1], "height": circleHeight[1], }));
    var $circles = $('.photo').append($('<div class="circle circle-c">').css({"left": xcoords[2] , "top": ycoords[2], "width": circleWidth[2], "height": circleHeight[2], }));
    var $circles = $('.photo').append($('<div class="circle circle-d">').css({"left": xcoords[3] , "top": ycoords[3], "width": circleWidth[3], "height": circleHeight[3], }));

    this.setCircleClickHandler();
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
  // score is upated by 100 points and
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
    console.log("correct clicks = " + correctClickCounts);
    scope.updateTracker();
  });

  $('.circle-b').click(function(e){
    console.log("The circle B was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-b').css("border", "solid red");
    $('.circle-b').off('click');
    correctClickCounts ++;
    console.log("correct clicks = " + correctClickCounts);
    scope.updateTracker();
  });
  $('.circle-c').click(function(e){
    console.log("The circle C was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-c').css("border", "solid red");
    $('.circle-c').off('click');
    correctClickCounts ++;
    console.log("correct clicks = " + correctClickCounts);
    scope.updateTracker();
  });
  $('.circle-d').click(function(e){
    console.log("The circle D was clicked!");
    score = score + 100;
    scope.updateScore(score);
    $('.circle-d').css("border", "solid red");
    $('.circle-d').off('click');
    correctClickCounts ++;
    console.log("correct clicks = " + correctClickCounts);
    scope.updateTracker();
  });
};

// set tracker in footer
photoHunt.setTracker = function(){
    $('.tracker').css("border","solid red");
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
    alert("CONGRATS! You completed level " + gameLevel + ".");
    gameLevel ++;
    console.log("New Game Level: " + gameLevel);
  }
}

// set the timer for each level
photoHunt.setTimer = function (){
  $("#timer").circletimer({
    timeout: 20000,
    onComplete: (function() {
      alert("Time is up!  You LOSE.")
    }),
    //  onUpdate: (function(elapsed) {
    //    var timeRemaining = 20000 - (Math.round(elapsed));
    //    console.log("Time Remaining: "  + timeRemaining);
    //  })
  });
}

// returns time left on timer
photoHunt.getTimerPoints = function(){
  $("#timer").circletimer({
     onUpdate: (function(elapsed) {
       console.log("Time elapsed: " + (Math.round(elapsed)));
    })
  });
}

// start the timer for each level
photoHunt.startTimer = function(){
  $("#timer").circletimer("start");
}

// ********************************

$(document).ready(function(){
 photoHunt.startGame();

});
