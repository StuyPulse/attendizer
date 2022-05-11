const express = require('express');
const app = express();

// Add routes from src/routes
require('./src/routes/id.routes')(app);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
