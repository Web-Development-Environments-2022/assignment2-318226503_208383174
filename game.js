var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsters_locations;
var monsters_remain;

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
  monsters_remain = 2;
  start_time = new Date();

  for (var i = 0; i < 10; i++) {
    board[i] = new Array();
  }

  var monsters_start_locations = [
    [0, 0],
    [0, 9],
    [9, 0],
    [9, 9],
  ];

  monsters_locations = [];
  for (var i = 0; i < monsters_remain; i++) {
    var location = monsters_start_locations[i];
    var x = location[0];
    var y = location[1];
    board[x][y] = 5;
    monsters_locations[i] = [x, y];
  }

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (board[i][j] == undefined) {
        if (
          // -- Obstacles --
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
            board[i][j] = 1;
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
  }
  while (food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 1;
    food_remain--;
  }

  // -- Keypressed --
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
  interval = setInterval(UpdatePosition, 500); // changed from 250
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
  if (keysDown[38]) {
    return 1;
  }
  if (keysDown[40]) {
    return 2;
  }
  if (keysDown[37]) {
    return 3;
  }
  if (keysDown[39]) {
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
      // - packman -
      if (board[i][j] == 2) {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
        // clean
      } else if (board[i][j] == 0) {
        context.clearRect(center.x, center.y, 30, 1.85 * Math.PI);
      }
      // - food -
      else if (board[i][j] == 1) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
        // - wall -
      } else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      }
      // - monster -
      else if (board[i][j] == 5) {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = "black"; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "white"; //color
        context.fill();
      }
    }
  }
}

function UpdatePosition() {
  updateEnemyPosition();
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
  if (board[shape.i][shape.j] == 1) {
    score++;
  }
  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = "green";
  }
  if (score == 50) {
    window.clearInterval(interval);
    window.alert("Game completed");
  } else {
    Draw();
  }

  function updateEnemyPosition() {
    for (var i = 0; i < monsters_remain; i++) {
      var location = monsters_locations[i];
      var x = location[0];
      var y = location[1];

      // checking if the monster should go vertically or horizontally
      x_dist = Math.abs(shape.i - x);
      y_dist = Math.abs(shape.j - y);

      // should move on the x axis
      if (x_dist > y_dist) {
        // move right
        if (x < shape.i) {
          monsters_locations[i][0] = monsters_locations[i][0] + 1;
          board[x + 1][y] = 5;
        }
        // move left
        else {
          monsters_locations[i][0] = monsters_locations[i][0] - 1;
          board[x - 1][y] = 5;
        }
      } else {
        // move down
        if (y < shape.j) {
          monsters_locations[i][1] = monsters_locations[i][1] + 1;
          board[x][y + 1] = 5;
        }
        // move up
        else {
          monsters_locations[i][1] = monsters_locations[i][1] - 1;
          board[x][y - 1] = 5;
        }
      }
      board[x][y] = 0;
    }
    // Draw();
  }
}
