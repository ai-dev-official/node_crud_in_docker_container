1. Setup the Database Table
This endpoint creates the schools table if it does not exist.
curl -X GET http://localhost:13000/setup

2. Retrieve All Records
This endpoint fetches all records from the schools table.
curl -X GET http://localhost:13000

3. Add a New Record
This endpoint adds a new record to the schools table. The Content-Type should be application/json, and the request body should contain name and location.
curl -X POST http://localhost:13000/ \
-H "Content-Type: application/json" \
-d '{
    "name": "Aoife", 
    "location": "63 Dublin Boulevard"
}'

4. Update a Record
This endpoint updates a record with the specified id. Replace <id> with the actual ID of the record you want to update. The request body should contain name and location.
curl -X PUT http://localhost:13000/<id> \
-H "Content-Type: application/json" \
-d '{
    "name": "Ashlyn", 
    "location": "83 Blanchardstown Park"
}'

5. Delete a Record
This endpoint deletes a record with the specified id. Replace <id> with the actual ID of the record you want to delete.
curl -X DELETE http://localhost:13000/<id>
