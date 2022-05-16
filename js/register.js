class gameUser {
  constructor(userName, password, firstName, lastName, email, bDay) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.bDay = bDay;
  }
}

$(document).ready(function () {
  $("#register_info").validate({
    rules: {
      userName: {
        required: true,
        userNameCheck: true,
      },
      password: {
        required: true,
        minlength: 6,
        password_check: true,
      },
      firstName: {
        required: true,
        letters_check: true,
      },
      lastName: {
        required: true,
        letters_check: true,
      },
      email: {
        required: true,
        email_check: true,
      },
    },
    messages: {
      userName: {
        required: "User Name is required",
        userNameCheck: "User Name is taken.",
      },
      password: {
        required: "Password is required",
        minlength: "Password should be at least {0} characters long",
        password_check: "Password should include only letters and digits", //TODO: need to explain better
      },
      firstName: {
        required: "First Name is required",
        letters_check: "First Name should include only letters",
      },
      lastName: {
        required: "Last Name is required",
        letters_check: "Last Name should include only letters",
      },
      email: {
        required: "E-Mail is required",
        email_check: "Please enter a legit e-mail address",
      },
    },
    submitHandler: function (form) {
      addNewUser(
        document.getElementById("user_name_input").value,
        document.getElementById("password_input").value,
        document.getElementById("fName_input").value,
        document.getElementById("lName_input").value,
        document.getElementById("eMail_input").value,
        document.getElementById("bDate_input").value
      );
    },
  });

  $.validator.addMethod("password_check", function (value) {
    return (
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && // consists of only these
      /\d/.test(value)
    ); // has a digit
  });

  $.validator.addMethod("letters_check", function (value) {
    return /^[A-Za-z]+$/i.test(value) || /^[a-zA-Z]+$/i.test(value);
  });

  $.validator.addMethod("email_check", function (value) {
    var mail_regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return mail_regex.test(value);
  });

  $.validator.addMethod("userNameCheck", function (value) {
    for (let i = 0; i < allUsers.length; i++) {
      if (value == allUsers[i].userName) {
        // user name exist
        return false;
      }
    }
    return true;
  });
});

// adding new user
function addNewUser(userName, password, firstName, lastName, email, bDay) {
  var newUser = new gameUser(
    userName,
    password,
    firstName,
    lastName,
    email,
    bDay
  );
  allUsers.push(newUser);
  goToLogin();
}