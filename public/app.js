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
    $("#welcomeMessage").hide();
    $("#signout").hide();


    console.log("Performed onload function");
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

            $("#failedLoginReason").text(error.message);
            $("#unableToLogIn").show();
        });
    });


    $("#registerSubmitButton").click(function(event){
        event.preventDefault();
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

            $("#failedLoginReason").text(error.message);
            $("#unableToLogIn").show();
        });
    });

    $("#signoutSubmitButton").click(function(event){
        event.preventDefault();
        console.log("Logging current user out...");

        firebase.auth().signOut().catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    });


    $("#resetPasswordLink").click(function(event){
        console.log("Enable resetting password");

        $("#resetPasswordPrompt").hide();
        $("#resetPasswordForm").show();
    });

    // handle user signin/outs
    firebase.auth().onAuthStateChanged(function(user){
        // user just signed in
        if(user)
        {
            console.log("Welcome " + user.email + "!");
            // set username id values to th email (for now)
            $("#userName").text(user.email);

            // hide the sign in form
            $("#registerForm").hide();

            // display the welcome message
            $("#welcomeMessage").show();
            // show the signout button
            $("#signoutSubmitButton").show();

            // in case this was enabled earlier
            $("#unableToLogIn").hide();

            // now user could reset password
            $("#resetPassword").show();
            $("#resetPasswordPrompt").show();

        }
        else //user just signed out
        {
            console.log("Goodbye!");
            // hide welcome message (and other content) and remove userName value
            $("#welcomeMessage").hide();
            $("#userName").text("");
            $("#signoutSubmitButton").hide();
            $("#resetPassword").hide();
            // bring back the sign in form
            $("#registerForm").show();

        }
    });

});