var context;
var shape = new Object();
var board;
var score;
var lives;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var moving_50_interval;
var special_candy_interval;
var pac_direction;
var moving_50 = new Object();
var special_candy = new Object();
//nums in board
var num_5_points = 80;
var num_15_points = 81;
var num_25_points = 82;
var num_50_points = 50;
var num_special_candy = 40;
var monsters_locations;
var monsters_remain;
const monster = 5;
const wasFoodNowMonster = 6;

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
  lives = 5;
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
    board[x][y] = monster;
    monsters_locations[i] = [x, y];
  }

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (board[i][j] == undefined) {
        if (
          (i == 3 && j == 3) ||
          (i == 3 && j == 4) ||
          (i == 3 && j == 5) ||
          (i == 6 && j == 1) ||
          (i == 6 && j == 2) ||
          (i == 1 && j == 8) ||
          (i == 2 && j == 8)
        ) {
          board[i][j] = 4;
        } else if (i == 1 && j == 1) {
          //TODO: check if ok
          board[i][j] = 50;
          moving_50.i = i;
          moving_50.j = j;
        } else {
          var randomNum = Math.random();
          if (randomNum <= (1.0 * food_remain) / cnt) {
            food_remain--;
            var randFoodNum = Math.floor(
              Math.random() * (num_25_points - num_5_points + 1) + num_5_points
            );
            board[i][j] = randFoodNum;
          } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
            shape.i = i;
            shape.j = j;
            pacman_remain--;
            board[i][j] = 2;
          } else {
            var randomNum = Math.random();
            if (randomNum <= (1.0 * food_remain) / cnt) {
              food_remain--;
              board[i][j] = 1;
            } else if (
              randomNum <
              (1.0 * (pacman_remain + food_remain)) / cnt
            ) {
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
  }
  while (food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    var randFoodNum = Math.floor(
      Math.random() * (num_25_points - num_5_points + 1) + num_5_points
    );
    board[emptyCell[0]][emptyCell[1]] = randFoodNum;
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
  var emptyCell_2 = findRandomEmptyCell(board);
  special_candy.i = emptyCell_2[0];
  special_candy.j = emptyCell_2[1];
  interval = setInterval(UpdatePosition, 90); // changed from 250
  moving_50_interval = setInterval(is_moving_50, 900);
  special_candy_interval = setInterval(update_special_candy, 3000);
  enemy_interval = setInterval(updateEnemyPosition, 500); // changed from 250
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
    //up
    pac_direction = "up";
    return 1;
  }
  if (keysDown[40]) {
    //down
    pac_direction = "down";
    return 2;
  }
  if (keysDown[37]) {
    //left
    pac_direction = "left";
    return 3;
  }
  if (keysDown[39]) {
    //right
    pac_direction = "right";
    return 4;
  }
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblLives.value = lives;
  lblTime.value = time_elapsed;
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      // - packman -
      if (board[i][j] == 2) {
        context.beginPath();
        context.fillStyle = pac_color; //color
        if (pac_direction === "up") {
          context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // TODO: check
        } else if (pac_direction === "right") {
          context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);
        } else if (pac_direction === "down") {
          context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI);
        } else {
          // left
          context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI);
        }

        // context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);

        context.fill();
        context.beginPath();
        // pacman eyes
        if (pac_direction === "up") {
          context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // TODO: check
        } else if (pac_direction === "right") {
          context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
        } else if (pac_direction === "down") {
          context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI);
        } else {
          // left
          context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
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
      else if (board[i][j] == 0) {
        context.clearRect(center.x, center.y, 0, 1.85 * Math.PI);
      }
      // - food -
      else if (board[i][j] == num_5_points) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "green"; //5
        context.fill();
      } else if (board[i][j] == num_15_points) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "orange"; //15
        context.fill();
      } else if (board[i][j] == num_25_points) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "red"; //25
        context.fill();
      } else if (board[i][j] == 4) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      } else if (board[i][j] == num_50_points) {
        var moving_50_pic = new Image();
        moving_50_pic.src = "./fifty.jpg";
        context.beginPath();
        context.drawImage(
          moving_50_pic,
          center.x - 30,
          center.y - 30,
          55,
          55 * (moving_50_pic.height / moving_50_pic.width)
        );
        // context.beginPath();
        // context.arc(center.x, center.y, 20, 0, 2 * Math.PI);
        // context.fillStyle = "pink"; //color
        // context.fill();
      } else if (board[i][j] == num_special_candy) {
        var special_candy_pic = new Image();
        special_candy_pic.src = "./special_candy_2.png";
        context.beginPath();
        context.drawImage(
          special_candy_pic,
          center.x - 30,
          center.y - 30,
          55,
          55 * (special_candy_pic.height / special_candy_pic.width)
        );
      }
      // - monster -
      else if (board[i][j] == monster || board[i][j] == wasFoodNowMonster) {
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = "blue"; //color
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
  // updateEnemyPosition();
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
  if (board[shape.i][shape.j] == num_5_points) {
    // +5
    score += 5;
  }
  if (board[shape.i][shape.j] == num_15_points) {
    // +15
    score += 15;
  }
  if (board[shape.i][shape.j] == num_25_points) {
    // +25
    score += 25;
  }
  if (board[shape.i][shape.j] == num_50_points) {
    // +50
    score += 50;
    window.clearInterval(moving_50_interval);
  }
  if (board[shape.i][shape.j] == num_special_candy) {
    // special candy points
    score += 40;
  }
  board[shape.i][shape.j] = 2;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  // if (score >= 100 && time_elapsed <= 10) {
  //   pac_color = "green";
  // }
  if (score >= 500) {
    window.clearInterval(interval);
    window.clearInterval(moving_50_interval);
    window.clearInterval(special_candy_interval);
    window.alert("Game completed");
  } else {
    Draw();
  }
}

function is_moving_50() {
  console.log([moving_50.i, moving_50.j]);
  var possiable_50_moves_ = available_50_move(moving_50.i, moving_50.j);
  console.log("the value of possiable_50_moves_ is: ");
  console.log(possiable_50_moves_);
  if (possiable_50_moves_.length == 0) {
    return;
  }
  var rand_50_move = Math.floor(Math.random() * possiable_50_moves_.length);
  console.log("the value of rand_50_move is " + rand_50_move);
  if (rand_50_move == 0) {
    board[moving_50.i][moving_50.j] = 0;
    moving_50.i = possiable_50_moves_[0][0];
    moving_50.j = possiable_50_moves_[0][1];
  }
  if (rand_50_move == 1) {
    board[moving_50.i][moving_50.j] = 0;
    moving_50.i = possiable_50_moves_[1][0];
    moving_50.j = possiable_50_moves_[1][1];
  }
  if (rand_50_move == 2) {
    board[moving_50.i][moving_50.j] = 0;
    moving_50.i = possiable_50_moves_[2][0];
    moving_50.j = possiable_50_moves_[2][1];
  }
  if (rand_50_move == 3) {
    board[moving_50.i][moving_50.j] = 0;
    moving_50.i = possiable_50_moves_[3][0];
    moving_50.j = possiable_50_moves_[3][1];
  }

  console.log(
    "the value of new [moving_50.i,moving_50.j] is " +
      [moving_50.i, moving_50.j]
  );
  board[moving_50.i][moving_50.j] = num_50_points;
}

function available_50_move(x, y) {
  var possiable_50_moves = new Array();
  var good_left;
  var good_right;
  var good_up;
  var good_down;
  console.log("the value of x,y is " + [x, y]);
  var nums = [2, 4, num_5_points, num_15_points, num_25_points];
  if (y > 0) {
    good_left = nums.includes(board[x][y - 1]);
    console.log("the value of left is " + board[x][y - 1]);
    if (!good_left) {
      console.log("the value of good_left is " + good_left);
      possiable_50_moves.push([x, y - 1]);
    }
  }
  if (y < 9) {
    good_right = nums.includes(board[x][y + 1]);
    console.log("the value of right is " + board[x][y + 1]);
    if (!good_right) {
      console.log("the value of good_right is " + good_right);
      possiable_50_moves.push([x, y + 1]);
    }
  }
  if (x > 0) {
    good_up = nums.includes(board[x - 1][y]);
    console.log("the value of up is " + board[x - 1][y]);
    if (!good_up) {
      console.log("the value of good_up is " + good_up);
      possiable_50_moves.push([x - 1, y]);
    }
  }
  if (x < 9) {
    good_down = nums.includes(board[x + 1][y]);
    console.log("the value of down is " + board[x + 1][y]);
    if (!good_down) {
      console.log("the value of good_down is " + good_down);
      possiable_50_moves.push([x + 1, y]);
    }
  }
  return possiable_50_moves;
}

function update_special_candy() {
  var empty_cell_for_special_candy = findRandomEmptyCell(board);
  board[special_candy.i][special_candy.j] = 0;
  special_candy.i = empty_cell_for_special_candy[0];
  special_candy.j = empty_cell_for_special_candy[1];
  board[special_candy.i][special_candy.j] = num_special_candy;
}

function updateEnemyPosition() {
  // debugger;
  for (var i = 0; i < monsters_remain; i++) {
    var location = monsters_locations[i];
    var x = location[0];
    var y = location[1];

    // checking if the monster should go vertically or horizontally
    x_dist = Math.abs(shape.i - x);
    y_dist = Math.abs(shape.j - y);

    // trying to get the best move without hitting a wall
    var move_result;
    if (x_dist > y_dist) {
      // should move horizontaly
      move_result = move_horizontaly_monster(x, y, i);
      if (move_result == false) {
        move_diagonally_monster(x, y, i);
      }
    } else {
      move_result = move_diagonally_monster(x, y, i);
      if (move_result == false) {
        move_horizontaly_monster(x, y, i);
      }
    }
    if (board[x][y] == wasFoodNowMonster) {
      board[x][y] = 1;
    } else {
      board[x][y] = 0;
    }
  }
  // Draw();
}

function move_horizontaly_monster(x, y, i) {
  var new_location;
  // move right
  if (x < shape.i) {
    new_location = [x + 1, y];
  }
  // move left
  else {
    new_location = [x - 1, y];
  }
  return move_monster(new_location, i);
}

function move_diagonally_monster(x, y, i) {
  // move down
  if (y < shape.j) {
    new_location = [x, y + 1];
  }
  // move up
  else {
    new_location = [x, y - 1];
  }
  return move_monster(new_location, i);
}

function move_monster(new_location, i) {
  debugger;
  var new_x = new_location[0];
  var new_y = new_location[1];
  if (board[new_x][new_y] == 4) {
    return false;
  }
  // food
  if (board[new_x][new_y] == 1) {
    board[new_x][new_y] = wasFoodNowMonster;
  } else if (board[new_x][new_y] == 2) {
    // packman
    eatenByMonster();
  } else {
    board[new_x][new_y] = monster;
  }
  monsters_locations[i] = new_location;
  return true;
}

function eatenByMonster() {
  if (lives > 0) {
    score -= 10;
    lives -= 1;
    // TODO- restart game
  } else {
    alert("game over"); //TODO
  }
}
