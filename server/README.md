# attendizer server

Backend for a simple attendance system.

## Setup

1. Create a database in the server directory by creating a file called `attendance.sqlite3`.
2. Install dependencies with `npm install`.
3. Run the server with `npm start`, or `npm run dev` for developer mode.

## Sending POST requests with a JSON
1. Modify postRequest.json in server/test to what you want to send.
2. send [curl -X POST -H "Content-Type: application/json" -d @./server/test/postRequest.json http://localhost:4000/ROUTE] into git bash

Example:
1. postRequest.json looks like this:
{
  "students": [
    {
      "name" : "testPerson",
      "osis" : 123123123,
      "uid" : 1231231231231
    },
    {
      "name" : "testPerson2",
      "osis" : 123123124,
      "uid" : 1231231231232
    }
  ]
}
2. send [curl -X POST -H "Content-Type: application/json" -d @./server/test/postRequest.json http://localhost:4000/reg] into git bash
