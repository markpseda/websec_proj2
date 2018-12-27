
console.log("Am i Here?");

function registerUser(){
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
    
}

function loginUser(){
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
}
