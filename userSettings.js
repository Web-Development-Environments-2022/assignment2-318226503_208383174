function checkSettings(){

    
    var keySet = new Set();
    keySet.add(user_upKey);
    keySet.add(user_downKey);
    keySet.add(user_leftKey);
    keySet.add(user_rightKey);
    var ballSet = new Set();
    ballSet.add(user_color_5p_check.value);
    ballSet.add(user_color_15p_check.value);
    ballSet.add(user_color_25p_check.value);
    // check arrow keys:
    if(keySet.size != 4){
        window.alert("please choose different key to each move.");
    }

    // check number of balls:
    else if (document.getElementById('num_of_food').value<50 || document.getElementById('num_of_food').value>90){
        window.alert("Number of food should be minimum 50 and maximum 90.");
    }

    // check ball colors

    else if(ballSet.size != 3){
        window.alert("please choose different colors to each food type.");
    }

    // check game_durition
    else if(document.getElementById('game_durition').value<60){
        window.alert("Game durition should be at least 60 seconds.");
    }

    // num of monsters
    else if(document.getElementById('num_monsters').value<1 || document.getElementById('num_monsters').value>4){
        window.alert("Number of monsters should be minimum 1 and maximum 4.");
    }
    else{
        startSettings();
    }

    }

function startSettings(){
    updateFoodNum();
    updateFoodColors();
    updateGameDurition();
    updateMonsters();
}

function update_upKey() {
	$(document).keydown(function(event){
		document.getElementById('upKey').value = event.key;
		user_upKey = event.key;
		$(document).unbind()
	});


}

function update_downKey() {
	$(document).keydown(function(event){
		document.getElementById('downKey').value = event.key;
		user_downKey = event.key;
		$(document).unbind()
	});

}

function update_leftKey() {
	$(document).keydown(function(event){
		document.getElementById('leftKey').value = event.key;
		user_leftKey = event.key;
		$(document).unbind()
	});

}

function update_rightKey() {
	$(document).keydown(function(event){
		document.getElementById('rightKey').value = event.key;
		user_rightKey = event.key;
		$(document).unbind()
	});

}

function update_allKeys(){
    console.log("up key is "+user_upKey);
    console.log("down key is "+user_downKey);
    console.log("left key is "+user_leftKey);
    console.log("right key is "+user_rightKey);

}
function updateFoodNum(){
    // document.getElementById('num_of_food').value='';
    food_remain = document.getElementById('num_of_food').value;
    // console.log("number of food is: "+food_remain);
}

function updateFoodColors(){
    user_color_5p = user_color_5p_check.value;
    user_color_15p = user_color_15p_check.value;
    user_color_25p = user_color_25p_check.value;
}

function randomSettings(){
    // keys
    document.getElementById('upKey').value = "ArrowUp";
    user_upKey = "ArrowUp";
    document.getElementById('downKey').value = "ArrowDown";
    user_downKey = "ArrowDown";
    document.getElementById('leftKey').value = "ArrowLeft";
    user_leftKey = "ArrowLeft";
    document.getElementById('rightKey').value = "ArrowRight";
    user_rightKey = "ArrowRight";
    // num of food
    document.getElementById('num_of_food').value = Math.floor(Math.random()*40+50);
    document.getElementById('game_durition').value = Math.floor(Math.random()*60+60);
    document.getElementById('num_monsters').value =Math.floor(Math.random()*3+1);
}
function updateGameDurition(){
    user_game_durition = document.getElementById('game_durition').value;
}

function updateMonsters(){
    monsters_remain = document.getElementById('num_monsters').value;
}