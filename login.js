var current_login_user;

$(document).ready(function () {
  $("#login_form").validate({
    rules: {
      uName: {
        required: true,
        isGameUser: true,
      },
      password: {
        required: true,
        isGameUserPassword: true,
      },
    },
    messages: {
      uName: {
        required: "Username is required",
        isGameUser: "wrong userName",
      },
      password: {
        required: "Password is required",
        isGameUserPassword: "wrong password",
      },
    },
    invalidHandler: function(form, validator) {
      var errors_num = validator.numberOfInvalids();
      var error_message="";
      if (errors_num) {
        if (validator.errorList.length > 0) {
            for (x=0;x<validator.errorList.length;x++) {
              if(x!=0){
                error_message += ","
              }              
              error_message += validator.errorList[x].message;
              error_message += " "
            }
        }
        alert(error_message);
      }
    },


    submitHandler: function (form) {
      current_gameUser = current_login_user;
      goToSettings();
    },
  });

  // check user name
  $.validator.addMethod("isGameUser", function (value) {
    for (let i = 0; i < allUsers.length; i++) {
      if (value == allUsers[i].userName) {
        // success
        current_login_user = allUsers[i];
        return true;
      }
    }
    return false;
  });

  // check if password is matching
  $.validator.addMethod("isGameUserPassword", function (value) {
    if (current_login_user) {
      return value == current_login_user.password;
    }
    return false;
  });
});
