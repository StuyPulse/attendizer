const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// ========== ROUTES ==========
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ========== SERVER ==========
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
