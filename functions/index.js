const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

function snakeCase(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
}

exports.newQuotesTrigger = functions.database.ref('library/{bookAndAuthor}').onWrite((snap, context) => {
    const message = snap;
    console.log('Retrieved message content: ', message);
    const newValue = message.after.val();
    console.log('new value ', newValue);

    const oldValue = message.before.val();
    console.log('old value ', oldValue);

    console.log('new quotes ', JSON.stringify(newValue.quotes));
    console.log('old quotes ', JSON.stringify(oldValue.quotes));

    const author = snakeCase(newValue.author);
    admin.database().ref('authors/' + author + '/quotes').set(newValue.quotes);
    console.log('Updated author')

    return message;
});

