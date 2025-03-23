#### Starting Mongo DB Database - use this command

brew services start mongodb-community@5.0

#### To verify that MongoDB is running

brew services list

### How to import data into local mongo db server

1. Convert into JSON format

2. Use the Mongo import utility 

mongoimport --db="database-name" --collection="collection-name" --file="file-name" --jsonArray

### Show all databases
show dbs

### Delete database

