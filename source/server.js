require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');

const server = express();

const port = process.env.PORT || 3000;

server.use(cors());
server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());

server.use(routes);

server.use((error, request, response, next) => {
  
  if (error.status) {
    response.status(error.status);
  } else {
    response.status(500);
  }

  return response.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'no stack': error.stack 
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
