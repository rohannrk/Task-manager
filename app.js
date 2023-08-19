const express = require('express');
const app = express();
const tasks = require('./server/routes/tasks');
const connectDB = require('./server/db/connect');
require('dotenv').config();
const notFound = require('./server/middleware/not-found');
const errorHandlerMiddleware = require('./server/middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();