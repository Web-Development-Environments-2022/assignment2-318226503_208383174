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
var monsters_start_locations;
var monsters_last_movment;
const num_of_rows = 15;
const num_of_cols = 15;

// paths
special_candy_path = "resources/candy.png";
fifty_points_path = "resources/fifty.png";
// ghosts paths
var red_down_path = "resources/ghosts/red down.png";
var red_left_path = "resources/ghosts/red left.png";
var red_right_path = "resources/ghosts/red right.png";
var red_up_path = "resources/ghosts/red up.png";

var blue_down_path = "resources/ghosts/blue down.png";
var blue_left_path = "resources/ghosts/blue left.png";
var blue_right_path = "resources/ghosts/blue right.png";
var blue_up_path = "resources/ghosts/blue up.png";

var pink_down_path = "resources/ghosts/pink down.png";
var pink_left_path = "resources/ghosts/pink left.png";
var pink_right_path = "resources/ghosts/pink right.png";
var pink_up_path = "resources/ghosts/pink up.png";

var orange_down_path = "resources/ghosts/orange down.png";
var orange_left_path = "resources/ghosts/orange left.png";
var orange_right_path = "resources/ghosts/orange right.png";
var orange_up_path = "resources/ghosts/orange up.png";

const MONSTER_START = 200;
// dict mapping values to paths
var ghostPaths = {
  200: red_up_path,
  201: red_right_path,
  202: red_down_path,
  203: red_left_path,

  210: blue_up_path,
  211: blue_right_path,
  212: blue_down_path,
  213: blue_left_path,

  220: pink_up_path,
  221: pink_right_path,
  222: pink_down_path,
  223: pink_left_path,

  230: orange_up_path,
  231: orange_right_path,
  232: orange_down_path,
  233: orange_left_path,
};

//nums in board
const num_5_points = 80;
const num_15_points = 81;
const num_25_points = 82;
const num_50_points = 83;
const num_special_candy = 40;
const food_types = [num_5_points, num_15_points, num_25_points];
const obstacles_to_ignore = [num_50_points, num_special_candy];

// setting the size for the objects
const canvasSizePx = 600;
const cellSizePx = canvasSizePx / num_of_rows;
const stretchMul = 60 / cellSizePx;
const food_size = 4;
const packman_size = 14; // 14
const packman_eyes = 2;
const monster_size = 28;
const special_candy_size = cellSizePx;

// monsters
var monsters_locations;
var monsters_remain;

// user keys
var user_upKey = "ArrowUp";
var user_downKey = "ArrowDown";
var user_leftKey = "ArrowLeft";
var user_rightKey = "ArrowRight";

// TODO: CHECK
// var lblLives = new Object();
var food_remain;

// color of food balls
var user_color_5p;
var user_color_15p;
var user_color_25p;

// game durution
var user_game_durition;

function StartGame() {
  context = canvas.getContext("2d");
  console.log("in start game");
  Start();
}

function Start() {
  board = new Array();
  score = 0;
  lives = 5;
  pac_color = "yellow";

  var cnt = num_of_cols * num_of_rows;
  var pacman_remain = 1;
  var remain_5p = Math.floor(0.6 * food_remain);
  var remain_15p = Math.floor(0.3 * food_remain);
  var remain_25p = Math.floor(0.1 * food_remain);

  start_time = new Date();

  for (var i = 0; i < num_of_rows; i++) {
    board[i] = new Array();
    for (var j = 0; j < num_of_cols; j++) {
      board[i].push(0);
    }
  }

  // monsters location
  monsters_start_locations = [
    [0, 0],
    [0, num_of_rows - 1],
    [num_of_cols - 1, 0],
    [num_of_cols - 1, num_of_rows - 1],
  ];

  monsters_last_movment = [];
  monsters_locations = [];

  // setting the starting location
  for (var i = 0; i < monsters_remain; i++) {
    var monster_movment = MONSTER_START + i * 10;
    // starting at the start location
    var location = monsters_start_locations[i];
    var x = location[0];
    var y = location[1];
    board[x][y] = monster_movment;
    monsters_locations[i] = [x, y];
  }

  for (var i = 0; i < num_of_rows; i++) {
    for (var j = 0; j < num_of_cols; j++) {
      if (board[i][j] == 0) {
        if (
          // walls
          // left up
          (i == 1 && j == 1) ||
          (i == 1 && j == 2) ||
          (i == 1 && j == 3) ||
          // left middle
          (i == 1 && j == 5) ||
          // left down
          (i == 1 && j == 12) ||
          (i == 2 && j == 12) ||
          (i == 3 && j == 12) ||
          // middle up
          (i == 4 && j == 1) ||
          (i == 5 && j == 1) ||
          (i == 6 && j == 1) ||
          (i == 5 && j == 2) ||
          (i == 5 && j == 3) ||
          // middle down
          (i == 3 && j == 7) ||
          (i == 3 && j == 8) ||
          (i == 3 && j == 9) ||
          (i == 4 && j == 7) ||
          (i == 5 && j == 7) ||
          // up right
          (i == 8 && j == 1) ||
          (i == 10 && j == 1) ||
          (i == 11 && j == 1) ||
          (i == 12 && j == 1) ||
          // middle right
          (i == 8 && j == 5) ||
          (i == 9 && j == 5) ||
          (i == 10 && j == 5) ||
          (i == 10 && j == 6) ||
          (i == 10 && j == 7) ||
          (i == 12 && j == 8) ||
          // right down
          (i == 12 && j == 12) ||
          (i == 12 && j == 11) ||
          (i == 12 && j == 10) ||
          // middle down
          (i == 7 && j == 12) ||
          (i == 8 && j == 12) ||
          (i == 9 && j == 12) ||
          (i == 8 && j == 11) ||
          (i == 8 && j == 10) ||
          (i == 8 && j == 9)
        ) {
          board[i][j] = 4;
        } else if (i == 7 && j == 7) {
          board[i][j] = num_50_points;
          moving_50.i = i;
          moving_50.j = j;
        }
      }
    }
  }

  var emptyCell;
  while (remain_5p > 0) {
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = num_5_points;
    remain_5p--;
    food_remain--;
  }
  while (remain_15p > 0) {
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = num_15_points;
    remain_15p--;
    food_remain--;
  }
  while (remain_25p > 0) {
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = num_25_points;
    remain_25p--;
    food_remain--;
  }
  // put pacman
  var emptyCell_pac = findRandomEmptyCell(board);
  board[emptyCell_pac[0]][emptyCell_pac[1]] = 2;
  shape.i = emptyCell_pac[0];
  shape.j = emptyCell_pac[1];
  pacman_remain--;

  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.key] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.key] = false;
    },
    false
  );
  var emptyCell_2 = findRandomEmptyCell(board);
  special_candy.i = emptyCell_2[0];
  special_candy.j = emptyCell_2[1];
  startInterval();
}

function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * (num_of_rows - 1) + 1);
  var j = Math.floor(Math.random() * (num_of_rows - 1) + 1);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * (num_of_rows - 1) + 1);
    j = Math.floor(Math.random() * (num_of_rows - 1) + 1);
  }
  return [i, j];
}

function GetKeyPressed() {
  if (keysDown[user_upKey]) {
    //up
    pac_direction = "up";
    return 1;
  }
  if (keysDown[user_downKey]) {
    //down
    pac_direction = "down";
    return 2;
  }
  if (keysDown[user_leftKey]) {
    //left
    pac_direction = "left";
    return 3;
  }
  if (keysDown[user_rightKey]) {
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
  for (var i = 0; i < num_of_rows; i++) {
    for (var j = 0; j < num_of_cols; j++) {
      var center = new Object();
      center.x = i * cellSizePx + cellSizePx / 2;
      center.y = j * cellSizePx + cellSizePx / 2;

      // - packman -
      if (board[i][j] == 2) {
        context.beginPath();
        context.fillStyle = pac_color; //color
        if (pac_direction === "up") {
          context.arc(
            center.x,
            center.y,
            packman_size,
            1.65 * Math.PI,
            1.35 * Math.PI
          ); // TODO: check
        } else if (pac_direction === "right") {
          context.arc(
            center.x,
            center.y,
            packman_size,
            0.15 * Math.PI,
            1.85 * Math.PI
          );
        } else if (pac_direction === "down") {
          context.arc(
            center.x,
            center.y,
            packman_size,
            0.65 * Math.PI,
            0.35 * Math.PI
          );
        } else {
          // left
          context.arc(
            center.x,
            center.y,
            packman_size,
            1.15 * Math.PI,
            0.85 * Math.PI
          );
        }
        context.lineTo(center.x, center.y);

        context.fill();
        context.beginPath();
        // pacman eyes
        if (pac_direction === "up") {
          context.arc(center.x + 7, center.y, packman_eyes, 0, 2 * Math.PI); // TODO: check
        } else if (pac_direction === "right") {
          context.arc(center.x + 2, center.y - 8, packman_eyes, 0, 2 * Math.PI);
        } else if (pac_direction === "down") {
          context.arc(center.x - 7, center.y, packman_eyes, 0, 2 * Math.PI);
        } else {
          // left
          context.arc(center.x, center.y - 9, packman_eyes, 0, 2 * Math.PI);
        }

        context.fillStyle = "black"; // eye color
        context.fill();
      } else if (board[i][j] == 0) {
        context.clearRect(center.x, center.y, 0, 1.85 * Math.PI);
      }

      // - monster -
      else if (board[i][j] >= MONSTER_START || board[i][j] < 0) {
        var monster_value = board[i][j];
        var monster_movment;
        // monster over food
        if (monster_value < 0) {
          monster_movment = MONSTER_START;
          var movment;
          // red
          if (monster_value > -100) {
            movment = monsters_last_movment[0];
            monster_movment += movment;
            // blue
          } else if (monster_value > -1000) {
            debugger;
            movment = monsters_last_movment[1];
            monster_movment += 10 + movment;
            // pink
          } else if (monster_value > -10000) {
            movment = monsters_last_movment[2];
            monster_movment += 20 + movment;
            // orange
          } else {
            movment = monsters_last_movment[3];
            monster_movment += 30 + movment;
          }
        } else {
          // the actual monster value
          monster_movment = monster_value;
        }
        var path = ghostPaths[monster_movment];
        drawCharacter(path, center, monster_size);
      }

      // - food -
      else if (board[i][j] == num_5_points) {
        context.beginPath();
        context.arc(center.x, center.y, food_size, 0, 2 * Math.PI); // circle
        context.fillStyle = user_color_5p; //5
        context.fill();
      } else if (board[i][j] == num_15_points) {
        context.beginPath();
        context.arc(center.x, center.y, food_size, 0, 2 * Math.PI); // circle
        context.fillStyle = user_color_15p; //15
        context.fill();
      } else if (board[i][j] == num_25_points) {
        context.beginPath();
        context.arc(center.x, center.y, food_size, 0, 2 * Math.PI); // circle
        context.fillStyle = user_color_25p; //25
        context.fill();
      } else if (board[i][j] == 4) {
        // wall
        context.beginPath();
        context.rect(
          center.x - cellSizePx / 2,
          center.y - cellSizePx / 2,
          cellSizePx,
          cellSizePx
        );
        color = "black";
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = "#1919A6";
        context.strokeRect(
          center.x - cellSizePx / 2,
          center.y - cellSizePx / 2,
          cellSizePx,
          cellSizePx
        );
        context.lineWidth = 3;
      } else if (board[i][j] == num_50_points) {
        drawCharacter(fifty_points_path, center, special_candy_size * 0.8);
      } else if (board[i][j] == num_special_candy) {
        drawCharacter(special_candy_path, center, special_candy_size);
      }
    }
  }
}

// generic function to draw character from image
function drawCharacter(src, center, size) {
  const img = new Image();
  img.src = src;
  context.drawImage(
    img,
    center.x - cellSizePx / 2,
    center.y - cellSizePx * (1 / 4),
    size,
    size * (img.height / img.width)
  );
}

// update packman position
function UpdatePosition() {
  board[shape.i][shape.j] = 0;
  var x = GetKeyPressed();
  console.log("x is: " + x);
  if (x == 1) {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
    }
  }
  if (x == 2) {
    if (shape.j < num_of_rows - 1 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
    }
  }
  if (x == 3) {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
    }
  }
  if (x == 4) {
    if (shape.i < num_of_cols - 1 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
    }
  }

  if (board[shape.i][shape.j] >= 200 || board[shape.i][shape.j] < 0) {
    eatenByMonster();
  }

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
  if (time_elapsed >= user_game_durition) {
    stopInterval();
    window.alert("No more time left!");
  }
  if (score >= 200) {
    stopInterval();
    window.alert("Game completed");
  } else {
    Draw();
  }
}

function is_moving_50() {
  var possiable_50_moves_ = available_50_move(moving_50.i, moving_50.j);
  if (possiable_50_moves_.length == 0) {
    return;
  }
  var rand_50_move = Math.floor(Math.random() * possiable_50_moves_.length);

  board[moving_50.i][moving_50.j] = 0;
  if (rand_50_move == 0) {
    moving_50.i = possiable_50_moves_[0][0];
    moving_50.j = possiable_50_moves_[0][1];
  }
  if (rand_50_move == 1) {
    moving_50.i = possiable_50_moves_[1][0];
    moving_50.j = possiable_50_moves_[1][1];
  }
  if (rand_50_move == 2) {
    moving_50.i = possiable_50_moves_[2][0];
    moving_50.j = possiable_50_moves_[2][1];
  }
  if (rand_50_move == 3) {
    moving_50.i = possiable_50_moves_[3][0];
    moving_50.j = possiable_50_moves_[3][1];
  }

  board[moving_50.i][moving_50.j] = num_50_points;
}

function available_50_move(x, y) {
  var possiable_50_moves = new Array();
  var good_left;
  var good_right;
  var good_up;
  var good_down;
  var nums = [2, 4, num_5_points, num_15_points, num_25_points];
  if (y > 0) {
    good_left = nums.includes(board[x][y - 1]);
    if (!good_left && board[x][y - 1] < 200 && board[x][y - 1] >= 0) {
      possiable_50_moves.push([x, y - 1]);
    }
  }
  if (y < num_of_rows - 1) {
    good_right = nums.includes(board[x][y + 1]);
    if (!good_right && board[x][y + 1] < 200 && board[x][y + 1] >= 0) {
      possiable_50_moves.push([x, y + 1]);
    }
  }
  if (x > 0) {
    good_up = nums.includes(board[x - 1][y]);

    if (!good_up && board[x - 1][y] < 200 && board[x - 1][y] >= 0) {
      possiable_50_moves.push([x - 1, y]);
    }
  }
  if (x < num_of_cols - 1) {
    good_down = nums.includes(board[x + 1][y]);
    if (!good_down && board[x + 1][y] < 200 && board[x + 1][y] >= 0) {
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

// update enemy position
function updateEnemyPosition() {
  for (var i = 0; i < monsters_remain; i++) {
    var location = monsters_locations[i];
    var x = location[0];
    var y = location[1];

    // checking if the monster should go vertically or horizontally
    x_dist = Math.abs(shape.i - x);
    y_dist = Math.abs(shape.j - y);

    // trying to get the best move without hitting a wall
    var move_result;
    debugger;
    var random = Math.random();

    if (x_dist > y_dist && random < 0.65) {
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
    if (board[x][y] < 0) {
      // monster standing on food- moving from the food
      if (i == 0) {
        // red
        board[x][y] = board[x][y] / -1;
      } else if (i == 1) {
        // blue
        board[x][y] = board[x][y] / -10;
      } else if (i == 2) {
        // pink
        board[x][y] = board[x][y] / -100;
      } else if (i == 3) {
        // orange
        board[x][y] = board[x][y] / -1000;
      }
    } else {
      board[x][y] = 0;
    }
  }
}

// move on the x axis
function move_horizontaly_monster(x, y, i) {
  var monster_movment = MONSTER_START + i * 10;
  var new_location;
  // move right
  if (x < shape.i) {
    new_location = [x + 1, y];
    monsters_last_movment[i] = 1;
    monster_movment += 1;
  }
  // move left
  else {
    new_location = [x - 1, y];
    monsters_last_movment[i] = 3;
    monster_movment += 3;
  }
  return move_monster(new_location, i, monster_movment);
}

// move on the y axis
function move_diagonally_monster(x, y, i) {
  var monster_movment = MONSTER_START + i * 10;
  // move down
  if (y < shape.j) {
    new_location = [x, y + 1];
    monsters_last_movment[i] = 2;
    monster_movment += 2;
  }
  // move up
  else {
    new_location = [x, y - 1];
    monsters_last_movment[i] = 0;
    monster_movment += 0;
  }
  return move_monster(new_location, i, monster_movment);
}

// set the new monster location
function move_monster(new_location, i, monster_movment) {
  var new_x = new_location[0];
  var new_y = new_location[1];
  if (
    // not to step on
    board[new_x][new_y] == 4 ||
    board[new_x][new_y] >= MONSTER_START ||
    obstacles_to_ignore.includes(board[new_x][new_y]) ||
    board[new_x][new_y] < 0
  ) {
    return false;
  }
  // food
  if (food_types.includes(board[new_x][new_y]) == true) {
    // was food- now monster
    if (i == 0) {
      // red
      board[new_x][new_y] = -1 * board[new_x][new_y];
    } else if (i == 1) {
      // blue
      board[new_x][new_y] = -10 * board[new_x][new_y];
    }
    if (i == 2) {
      // pink
      board[new_x][new_y] = -100 * board[new_x][new_y];
    }
    if (i == 3) {
      // orange
      board[new_x][new_y] = -1000 * board[new_x][new_y];
    }
  } else if (board[new_x][new_y] == 2) {
    // packman
    eatenByMonster();
    return true;
  } else {
    // 0
    board[new_x][new_y] = monster_movment;
  }
  monsters_locations[i] = new_location;
  return true;
}

// packman eaten by monster
function eatenByMonster() {
  stopInterval();
  if (lives > 0) {
    score -= 10;
    lives -= 1;
    restart();
  } else {
    alert("game over"); //TODO
  }
}

function restart() {
  // restart packman
  var emptyCell = findRandomEmptyCell(board);
  board[shape.i][shape.j] = 0;

  // restart monsters
  for (var i = 0; i < monsters_remain; i++) {
    // clearing the current positon of the monsters
    var current_location = monsters_locations[i];
    var current_x = current_location[0];
    var current_y = current_location[1];
    board[current_x][current_y] = 0;
    // restarting them at the starting positions
    var start_location = monsters_start_locations[i];
    var start_x = start_location[0];
    var start_y = start_location[1];
    monsters_locations[i] = [start_x, start_y];
  }

  shape.i = emptyCell[0];
  shape.j = emptyCell[1];
  board[emptyCell[0]][emptyCell[1]] = 2;

  const deathDiv = $("#youDied");
  deathDiv.addClass("active");
  setTimeout(() => {
    startInterval();
    deathDiv.removeClass("active");
  }, 2000);
}

// stopping the interval
function stopInterval() {
  clearInterval(interval);
  clearInterval(moving_50_interval);
  clearInterval(special_candy_interval);
  clearInterval(enemy_interval);
}

// starting the interval
function startInterval() {
  interval = setInterval(UpdatePosition, 120);
  moving_50_interval = setInterval(is_moving_50, 600);
  special_candy_interval = setInterval(update_special_candy, 3000);
  enemy_interval = setInterval(updateEnemyPosition, 800);
}
