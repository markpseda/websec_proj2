// Initialize Firebase for Local Development
var config = {
    apiKey: "AIzaSyCgaJ1x-IblGK8RaAFm3wlIOtKzC2VfVUs",
    authDomain: "websec-proj2.firebaseapp.com",
    databaseURL: "https://websec-proj2.firebaseio.com",
    projectId: "websec-proj2",
    storageBucket: "websec-proj2.appspot.com",
    messagingSenderId: "1093643732220"
  };
//firebase.initializeApp(config);


window.onload = function (){
    var email = document.getElementById("emailInput");
    var password = document.getElementById("passwordInput");
    var login = document.getElementById("loginSubmitButton");
    var register = document.getElementById("registerSubmitButton");
    var signout = document.getElementById("signoutSubmitButton");
    console.log("Performed onload function");
    //login.addEventListener("click", loginUser());
    //register.addEventListener("click", registerUser());
    //signout.addEventListener("click", signout());


}

// wait until dom is loaded
$(function(){

    $("#loginSubmitButton").click(function(event){
        event.preventDefault();
        console.log("Signing in existing user...")
        console.log($('#emailInput').val());
        console.log($('#password').val());
        //firebase.initializeApp(config); // init firebase
        firebase.auth().signInWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    });


    $("#registerSubmitButton").click(function(event){
        event.preventDefault();
        alert("register clicked!");
        console.log("Registering user...");
        console.log($('#emailInput').val());
        console.log($('#passwordInput').val());
        //firebase.initializeApp(config); // init firebase
        firebase.auth().createUserWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log($('#emailInput').val());
            console.log($('#passwordInput').val());
            console.log(errorCode);
            console.log(errorMessage);
        });
    });


});