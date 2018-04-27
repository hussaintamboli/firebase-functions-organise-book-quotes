const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function snakeCase(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
}

function arrayDiff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var j = 0; j < a2.length; j++) {
        if (a[a2[j]]) {
            delete a[a2[j]];
        } else {
            a[a2[j]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

exports.newQuotesTrigger = functions.database.ref('library/{bookAndAuthor}').onWrite((snap, context) => {
    const message = snap;
    console.log('Retrieved message content: ', message);

    const newValue = message.after.val();
    const oldValue = message.before.val();

    const newQuotes = newValue.quotes || [];
    const oldQuotes = oldValue.quotes || [];
    const diff = arrayDiff(newQuotes, oldQuotes);
    
    if (diff) {
        console.log('Quotes were updated for ', {title: newValue.title, author: newValue.author});
        const author = snakeCase(newValue.author);
        admin.database().ref('authors/' + author).child('quotes').push(diff);
        console.log('Updated author quotes');
    }
    
    return message;
});

