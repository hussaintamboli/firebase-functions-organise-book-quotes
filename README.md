My [reactjs-book-quoutes-organiser](https://github.com/hussaintamboli/reactjs-book-quoutes-organiser) app needs to store and show quotes by book title and author. It's a reactjs app with Firebase DB in backend that uses rest api to interact with it.

My Firebase DB structure looks like this.

![BookQuotes DB-half](https://github.com/hussaintamboli/firebase-functions-organise-book-quotes/book quotes library.png)

It's troublesome to fetch quotes of an author. I need to store quotes of author separately and fetch from there. 

`newQuotesTrigger` **function takes a new quote and adds it under author's quotes.**

![BookQuotes DB-complete](https://github.com/hussaintamboli/firebase-functions-organise-book-quotes/book quotes firebase db.png)

