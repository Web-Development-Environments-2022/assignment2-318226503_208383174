var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var pac_direction

// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function StartGame() {
  context = canvas.getContext("2d");

  Start();
}

function Start() {
  board = new Array();
  score = 0;
  pac_color = "yellow";
  var cnt = 100;
  var food_remain = 50;
  var pacman_remain = 1;
  start_time = new Date();
  for (var i = 0; i < 10; i++) {
    board[i] = new Array();
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 10; j++) {
      if (
        (i == 3 && j == 3) ||
        (i == 3 && j == 4) ||
        (i == 3 && j == 5) ||
        (i == 6 && j == 1) ||
        (i == 6 && j == 2)
      ) {
        board[i][j] = 4;
      } else {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * food_remain) / cnt) {
          food_remain--;
          // board[i][j] = 1; // TODO: what is it?
          var randFoodNum = Math.floor(Math.random()*(82-80+1)+80)
          board[i][j] = randFoodNum;
        } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
          shape.i = i;
          shape.j = j;
          pacman_remain--;
          board[i][j] = 2;
        } else {
          board[i][j] = 0;
        }
        cnt--;
      }
    }
  }
  while (food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    var randFoodNum = Math.floor(Math.random()*(82-80+1)+80)
    board[emptyCell[0]][emptyCell[1]] = randFoodNum;
    food_remain--;
  }
  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );
  interval = setInterval(UpdatePosition, 180); // changed from 250
}

function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * 9 + 1);
  var j = Math.floor(Math.random() * 9 + 1);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * 9 + 1);
    j = Math.floor(Math.random() * 9 + 1);
  }
  return [i, j];
}

function GetKeyPressed() {
  if (keysDown[38]) { //up
    pac_direction = "up"
    return 1;
  }
  if (keysDown[40]) { //down
    pac_direction = "down"
    return 2;
  }
  if (keysDown[37]) { //left
    pac_direction = "left"
    return 3;
  }
  if (keysDown[39]) { //right
    pac_direction = "right"
    return 4;
  }
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = time_elapsed;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      if (board[i][j] == 2) {
        context.beginPath();
        context.fillStyle = pac_color; //color
        if(pac_direction === "up"){
          context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // TODO: check
        }

        else if (pac_direction === "right"){
          context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); 
        }
        
        else if (pac_direction === "down"){
          context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); 
        }

        else{ // left
          context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); 
        }

        // context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        
        context.fill();
        context.beginPath();
        // pacman eyes
        if(pac_direction === "up"){
          context.arc(center.x+15, center.y-5, 5,0, 2 * Math.PI); // TODO: check
        }

        else if (pac_direction === "right"){
          context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
        }
        
        else if (pac_direction === "down"){
          context.arc(center.x-15, center.y+5, 5, 0, 2 * Math.PI);
        }

        else{ // left
          context.arc(center.x-5, center.y-15, 5, 0, 2 * Math.PI); 
        }

        // context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; // eye color
        context.fill();
      } 
      //else if (board[i][j] == 1) {
      //   context.beginPath();
      //   context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
      //   context.fillStyle = "black"; //color
      //   context.fill();} 
      else if (board[i][j] == 80) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "green"; //5
        context.fill();}
        else if (board[i][j] == 81) {
          context.beginPath();
          context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
          context.fillStyle = "orange"; //15
          context.fill();}      else if (board[i][j] == 82) {
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle = "red"; //25
            context.fill();}
      else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      }
    }
  }
}

function UpdatePosition() {
  board[shape.i][shape.j] = 0;
  var x = GetKeyPressed();
  if (x == 1) {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
    }
  }
  if (x == 2) {
    if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
    }
  }
  if (x == 3) {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
    }
  }
  if (x == 4) {
    if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
    }
  }
  // if (board[shape.i][shape.j] == 1) { 
  // score +=1;}
  if (board[shape.i][shape.j] == 80) { // +5
    score += 5;
  }
  if (board[shape.i][shape.j] == 81) { // +15
    score +=15;
  }
  if (board[shape.i][shape.j] == 82) { // +25
    score +=25;
  }
  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = "green";
  }
  if (score == 200) {
    window.clearInterval(interval);
    window.alert("Game completed");
  } else {
    Draw();
  }
}
