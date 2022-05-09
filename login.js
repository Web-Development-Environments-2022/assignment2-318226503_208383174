
var current_login_user;

$(document).ready(function () {

    $("#login_form").validate({
        rules: {
            uName: {
                required: true,
                isGameUser: true
            },
            password: {
                required: true,
                isGameUserPassword: true
            }

        },
        messages: {
            uName: {
                required: "UserName is required",
                isGameUser: "wrong userName"
            },
            password: {
                required: "Password is required",
                isGameUserPassword: "wrong password"
            }
        },
        submitHandler: function (form) { 
            current_gameUser = current_login_user;
            goToSettings();
        }
    });

    // check user name
    $.validator.addMethod("isGameUser", function(value) {

        for (let i = 0; i < allUsers.length; i++) {
            if(value==allUsers[i].userName){
                // success
                current_login_user = allUsers[i];
                return true;
            }
          } 
        return false;
     });

     // check if password is matching
     $.validator.addMethod("isGameUserPassword", function(value) {
         return value==current_login_user.password;
     });


});

