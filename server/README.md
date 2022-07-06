# attendizer server

Backend for a simple attendance system.

## Setup

1. Create a database in the server directory by creating a file called `attendance.sqlite3`.
2. Install dependencies with `npm install`.
3. Run the server with `npm start`, or `npm run dev` for developer mode.

## Sending POST requests with a JSON
1. Modify postRequest.json in src/models/test to what you want to send.
2. send [curl -X POST -H "Content-Type: application/json" -d @FILEPATH http://localhost:4000/ROUTE] into git bash