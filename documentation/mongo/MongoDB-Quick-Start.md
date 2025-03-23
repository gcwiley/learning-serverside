This guide will show you how to set up a simple application using Node.js and MongoDB. Its scope is only how to set up the driver and perform the simple CRUD operations. 

##Create the package.json file
First, create a directory where your application will live.
```
mkdir myproject
cd myproject
```
Enter the following command and answer the questions to create the initial structure for your new project:
```
npm init
```
Next, install the driver dependency.
```
npm install mongodb --save
```
You should see **NPM** download a lot of file. Once it's done you'll find all the downloaded package under the **node_modules** directory.
####Start a MongoDB Server
1. Download the right MongoDB version from MongoDB
2. Create a database directory (in this case under **/data**).
3. Install and start a `mongodb` process
```
mongodb --dbpath=/data
```
You should see the **mongodb** process start up and print some status information.
####Connect to MongoDB
Create a new **app.js** file and add the following code to try out some basic CRUD operations using the MongoDB driver.

Add code to connect to the server and the database **myproject**
```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
```