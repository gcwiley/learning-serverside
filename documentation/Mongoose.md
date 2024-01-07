## Getting Started
First be sure you have MongoDB and Node.js installed.

Next install Mongoose from the command line using `npm`:
```sh
npm install mongoose
```
Now say we like fuzzy kittens and want to record every kitten we ever meet in MongoDB. The first thing we need to do is include mongoose in our project and open a connection to the `test` database on our locally running instance of MongoDB.
```js
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
```
We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
```js
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   // we're connected
});
```