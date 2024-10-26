const express = require('express');

const app = express();

// listen to port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000 and ready to accept requests!');
});