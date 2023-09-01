const express = require('express');

const tasks = require;
const connectDb = require("./server/config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require('cors');

connectDb();

// middleware
const app = express();
// app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/tasks', require('./server/routes/tasks'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});