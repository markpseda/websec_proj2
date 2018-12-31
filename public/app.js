/*
Essentially a login page and one-page app. 

This script is called after the entire page is loaded.

Much of the code could be separated out into a separate login page 
that then redirects to another application page. That will be the
right approach for the DIY reddit I think - at least two separate
pages, that way all the login information and logic is not cluttering
the main application page that is only accesible when signed in.
*/


// runs once when script is called (initialization)
$("#welcomeMessage").hide();
$("#signout").hide();
$("#signoutSubmitButton").hide();


$("#loginSubmitButton").click(function (event) {
    event.preventDefault();
    console.log("Signing in existing user...")
    console.log($('#emailInput').val());
    console.log($('#password').val());

    firebase.auth().signInWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).then(function (user) {
        console.log("Sign in via username/password successful");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        $("#failedLoginReason").text(errorMessage);
        $("#unableToLogIn").show();
    });

    $("#passwordInput").val('');

});


$("#registerSubmitButton").click(function (event) {
    event.preventDefault();
    console.log("Registering user...");
    console.log($('#emailInput').val());
    console.log($('#passwordInput').val());
    //firebase.initializeApp(config); // init firebase
    firebase.auth().createUserWithEmailAndPassword($('#emailInput').val().toString(), $('#passwordInput').val()).
        then(function (user) {
            console.log("Register via username/password successful");
            $("#signInMethod").text("email/password");
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log($('#emailInput').val());
            console.log($('#passwordInput').val());
            console.log(errorCode);
            console.log(errorMessage);

            $("#failedLoginReason").text(errorMessage);
            $("#unableToLogIn").show();
        });

    $("#passwordInput").val('');
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

$("#facebookLogin").click(function (event) {
    console.log("Logging in via facebook...");
    var provider = new firebase.auth.FacebookAuthProvider();

    //provider.addScope('default');

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        //console.log(user);
        //$("#signInMethod").text("Facebook");
        //console.log

        //userPicture=user.picture;
        // ...
    }).catch(function (error) {
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

$("#googleLogin").click(function (event) {
    console.log("Logging in via google...");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        $("#signInMethod").text("Google");

    }).catch(function (error) {
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



$("#moreSignInMethods").click(function (event) {
    $("#multipleSignInsPrompt").hide();
    $("#multipleSignIns").show();
});



// handle user signin/outs
firebase.auth().onAuthStateChanged(function (user) {
    // user just signed in
    if (user) {
        console.log("Welcome!");
        // set username id values to th email (for now)

        $("#signInMethod").empty();

        // get all the providers for the current user
        user.providerData.forEach(function (currProvider) {
            console.log(currProvider.providerId);
            $("#signInMethod").append('<li>' + currProvider.providerId + '</li>');
        });


        $("#userEmail").text(user.email);

        if (user.displayName != null) {
            $("#userName").text(user.displayName);
        }
        else // email always available
        {
            $("#userName").text(user.email);
        }

        if(user.photoURL != null)
        {
            $("#userImage").attr("src", user.photoURL);
            $("#userImage").show();
        }


        // can only reset password if account has a password!
        // just checking ul text to see if it contains the string password.
        // probably not the best way...
        if ($("#signInMethod").text().includes("password")) 
        {
            $("#resetPassword").show();
        }
        else 
        {
            $("#resetPassword").hide();
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
        $("#resetPasswordPrompt").show();

        // user can see secret page
        $("#secretPageText").show();

        // just in case, clear user and password fields.
        $("#emailInput").val('');
        $("#passwordInput").val('');
    }
    else //user just signed out
    {
        // just in case, clear user and password fields.
        $("#emailInput").val('');
        $("#passwordInput").val('');
        
        console.log("Goodbye!");
        // hide welcome message (and other content) and remove userName value
        $("#welcomeMessage").hide();
        $("#userName").text("");
        $("#signoutSubmitButton").hide();
        $("#resetPassword").hide();
        $("#resetPasswordFailure").hide();
        $("#resetPasswordSuccess").hide();

        // bring back the sign in form
        $("#registerForm").show();
        $("#oAuthSection").show();

        // remove image for next user to sign in
        $("#userImage").attr("src", "");
        $("#userImage").hide();

        // user cannot see secret page
        $("#secretPageText").hide();
    }
});