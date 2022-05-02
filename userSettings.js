function startSettings(){

    // update_upKey();
    // update_downKey();
    // update_leftKey();
    // update_rightKey();
    updateFoodNum();
    //remove
    // update_allKeys();

    }



function update_upKey() {
	$(document).keydown(function(event){
		document.getElementById('upKey').value = event.key;
		user_upKey = event.key;
		$(document).unbind()
	});
    console.log("up key is "+user_upKey)

}

function update_downKey() {
	$(document).keydown(function(event){
		document.getElementById('downKey').value = event.key;
		user_downKey = event.key;
		$(document).unbind()
	});
    console.log("down key is "+user_downKey)
}

function update_leftKey() {
	$(document).keydown(function(event){
		document.getElementById('leftKey').value = event.key;
		user_leftKey = event.key;
		$(document).unbind()
	});
    console.log("left key is "+user_leftKey)
}

function update_rightKey() {
	$(document).keydown(function(event){
		document.getElementById('rightKey').value = event.key;
		user_rightKey = event.key;
		$(document).unbind()
	});
    console.log("right key is "+user_rightKey)
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