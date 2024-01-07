```js
npm install mongodb --save
```
#### Connect to a Single Mongo DB Instance
To connect to a single MongoDB instance,
 
```js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
```
