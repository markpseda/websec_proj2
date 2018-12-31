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


window.onload = function () {
    $("#welcomeMessage").hide();
    $("#signout").hide();


    console.log("Performed onload function");
}

// wait until dom is loaded
$(function () {

    $("#loginSubmitButton").click(function (event) {
        event.preventDefault();
        console.log("Signing in existing user...")
        console.log($('#emailInput').val());
        console.log($('#password').val());
        //firebase.initializeApp(config); // init firebase
        firebase.auth().signInWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            $("#failedLoginReason").text(errorMessage);
            $("#unableToLogIn").show();
        });
    });


    $("#registerSubmitButton").click(function (event) {
        event.preventDefault();
        console.log("Registering user...");
        console.log($('#emailInput').val());
        console.log($('#passwordInput').val());
        //firebase.initializeApp(config); // init firebase
        firebase.auth().createUserWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log($('#emailInput').val());
            console.log($('#passwordInput').val());
            console.log(errorCode);
            console.log(errorMessage);

            $("#failedLoginReason").text(errorMessage);
            $("#unableToLogIn").show();
        });
    });

    $("#signoutSubmitButton").click(function (event) {
        event.preventDefault();
        console.log("Logging current user out...");

        firebase.auth().signOut().catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    });


    $("#resetPasswordLink").click(function (event) {
        console.log("Enable resetting password");

        $("#resetPasswordPrompt").hide();
        $("#resetPasswordForm").show();
    });


    $("#resetPasswordSubmitButton").click(function (event) {
        event.preventDefault();
        console.log("Attempting to reset user password...");

        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            $("#oldPassword").val()
        );

        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            // user passed in a correct oldpassword, now change the password.
            user.updatePassword($("#newPassword").val()).then(function () {
                console.log("Password updated succesfully!");
                $("#resetPasswordSuccess").show();
                $("#resetPasswordFailure").hide();
                $("#resetPasswordForm").hide();

            }).catch(function (error) {
                console.log("Password update failed!");
                $("#resetPasswordFailure").show();
            });
        }).catch(function (error) {
            console.log("Could not reset password - authentication failed")
            $("#resetPasswordFailure").show();
        });
    });

    $("#secretPageLink").click(function (event) {
        console.log("Accessing Secret Page");
        window.location.pathname = "signed_in.html";
        
    });

    $("#facebookLogin").click(function (event) {
        console.log("Logging in via facebook...");
        var provider = new firebase.auth.FacebookAuthProvider();

        //provider.addScope('default');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //var token = result.credential.accessToken;
            // The signed-in user info.
            //var user = result.user;
            //console.log(user);

            //console.log

            //userPicture=user.picture;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.

            console.log(error.code);
            console.log(error.message);
            $("#failedLoginReason").text(errorMessage);
            $("#unableToLogIn").show();
            
          });
        
    });

    // handle user signin/outs
    firebase.auth().onAuthStateChanged(function (user) {
        // user just signed in
        if (user) {
            console.log("OnAuthStateChanged");
            console.log(user);
            console.log("Welcome " + user.email + "!");
            console.log(user.first_name);
            console.log(user.picture);
            // set username id values to th email (for now)

            // only present for oauth
            if(user.displayName != null)
            {
                $("#userName").text(user.displayName);
            }
            else // email always available
            {
                $("#userName").text(user.email);
            }


            

            // hide the sign in form
            $("#registerForm").hide();
            $("#oAuthSection").hide();

            // display the welcome message
            $("#welcomeMessage").show();
            // show the signout button
            $("#signoutSubmitButton").show();

            // in case this was enabled earlier
            $("#unableToLogIn").hide();

            // now user could reset password
            $("#resetPassword").show();
            $("#resetPasswordPrompt").show();

            // user can see secret page
            $("#secretPageText").show();
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
            $("#oAuthSection").show();

            // user cannot see secret page
            $("#secretPageText").hide();
        }
    });


});