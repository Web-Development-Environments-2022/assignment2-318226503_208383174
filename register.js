// function saveRegister(){

// }
$(document).ready(function () {

    $("#register_info").validate({
        rules: {
            userName: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,  
                password_check: true,
            },
            firstName:{
                required: true,
                letters_check: true,
            },
            lastName:{
                required: true,
                letters_check: true,
            },
            email:{
                required: true,
                email_check: true,
            }

        },
        messages: {
            userName: {
                required: "User Name is required"
            },
            password: {
                required: "Password is required",
                minlength: "Password should be at least {0} characters long" ,
                password_check: "Password should include only letters and digits" //TODO: need to explain better
            }
            ,
            firstName:{
                required: "First Name is required",
                letters_check: "First Name should include only letters",
            },
            lastName:{
                required: "Last Name is required",
                letters_check: "Last Name should include only letters",
            },
            email:{
                required: "E-Mail is required",
                email_check: "Please enter a legit e-mail address",
            }
        },
        submitHandler: function (form) { // for demo
            console.log("got into submit handler");
            alert('valid form');  // for demo
            return false;  // for demo
        }
    });

// https://stackoverflow.com/questions/16556968/how-to-check-if-text-fields-are-empty-on-form-submit-using-jquery
// $('#register_info').submit(function () {

//     var username = $.trim($('#user_name_input').val());
// console.log("username is: "+username);
//     // Check if empty of not
//     if (username  === '') {
//         alert('Text-field is empty.');
//         return false;
//     }
// });


//https://stackoverflow.com/questions/18746234/jquery-validate-plugin-password-check-minimum-requirements-regex

$.validator.addMethod("password_check", function(value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        && /\d/.test(value); // has a digit
 });

 $.validator.addMethod("letters_check", function(value) {
    return /^[A-Za-z]+$/i.test(value) || /^[a-zA-Z]+$/i.test(value) ;

 });

 $.validator.addMethod("email_check", function(value) {
    var mail_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return mail_regex.test(value) ;

 });
 
});