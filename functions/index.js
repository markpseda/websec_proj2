const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createsmatch = functions.database.ref("/people/{personid}").onWrite(
function(thechange, context){
    var personid = context.params.personid;
    var data = thechange.after.val();

    if (!data){
        return null;
    }
    
    var actionsRef = thechange.after.ref.parent.parent.child("actioncount");
    return actionsRef.transaction(function(counter){
        if (!!counter || counter === 0){
            counter += 1;
        } else {
            counter = 1;
        }
        return counter;
    });
});