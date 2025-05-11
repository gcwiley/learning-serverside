### Quick Start
This guide will show you how to set up a simple application using Node.js and MongoDB. Its scope is only how to set up the driver and peform the simple CRUD operations.

### Create the package.json file
First, create a directory where your application will live.
```sh
mkdir myproject
cd myproject
```
Enter the following command and answer the questions to create the initial structure for your new project:
```sh
npm init
```
Next, install the driver dependency.
```sh
npm install mongodb --save
```
You should see **NPM** download a lot of files. Once it's done you'll find all of the downloaded packages under the **node_modules** directory.

### Start a MongoDB Server
1. Download the right MongoDB version from MongoDB (https://www.mongodb.org/downloads)
2. Create a database directory (in this case under **/data**).
3. Install and start a `mongodb` process
```sh
mongod --dbpath=/data
```
You should see the **mongod** process start up and print some status information.

### Connect to MongoDB
Creaet a new **app.js** file and add the following code to try out some basic CRUD operations using the MongoDB driver.

Add code to connect to the server and the database **myproject**:
```js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});
```
Run your app from the command line with:
```sh
node app.js
```
The application should print **Connected successfully to server** to the console.

### Insert a Document
Add to **app.js** the following function which uses the **insertMany** method to add three documents to the **documents** collection.
```js
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.lenght);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}
```
The **insert** command return an object with the following fields:
* **result** Contains the result document from MongoDB
* **ops** Contains the documents inserted with add **_id** fields
* **connection** Contains the connection used to perform the insert

Add the following code to call the **insertDocuments** function:
```js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function() {
        client.close();
    });
});
```
Run the updated **app.js** file: 
```sh
node app.js
```
The operation returns the following output:
```sh
Connected successfully to server
Inserted 3 Documents into the collection
```

### Find All Documents
Add a query that returns all the documents.
```js
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}
```