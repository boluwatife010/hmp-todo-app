// APIs
// Application Programming Interface
// REST API
// Representational State Transfer API

// HTTP/2
// HTTP Methods
// GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD

// HTTP Status Codes
// 1xx - Informational
// 2xx - Success
// 3xx - Redirection
// 4xx - Client Error
// 5xx - Server Error

// HTTP Headers
// Content-Type
// Accept
// Authorization
// Cookie

// Request Body
// Response Body

// HOST
// PORT
// http://127.0.0.1:3000



// import { searchGitHubUsers } from './src/client/github.client';
// import { getGitHubRepoLanguage } from './src/client/github.client';
// import { getGitHubUserProfile } from './src/client/github.client';
// Components of a REST API
// 1. Resource
// 2. Endpoint
// 3. HTTP Method
// 4. Request Body
// 5. Response Body
// 6. Status Code

// Express
// Route/Endpoint, method, middlewares, handler
// Example: https://www.google.com/search?q=nigeria+super+falcons&oq=nigeria+super+falcons&gs_lcrp


require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { TodoModel } from './src/models/todo';
import { firstDocument, secondDocument } from './src/sample.data';
import todoRouter from './src/routes/todo';
import githubRouter from './src/routes/github';

const app = express();
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).send('Hello guys, welcome to Opolo Hub!');
});

app.get('/about', (req: express.Request, res: express.Response) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.query);
  return res.status(200).send('This is the about page');
});

app.get('/students', (req: express.Request, res: express.Response) => {
  return res.status(404).send('Page Not Found');
});

app.use('/todos', todoRouter);
app.use('/github', githubRouter);

app.listen(5672, async () => {
  console.log('Server is running at http://localhost:5672');
  await mongoose.connect('mongodb://127.0.0.1/hmp-todo-app');
  console.log('Connected to MongoDB');
});

export {};

