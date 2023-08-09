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

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { TodoModel } from './src/models/todo';
import { firstDocument, secondDocument } from './src/sample.data';

const app = express();
app.use(bodyParser.json());

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

// post request
app.post('/students', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  return res.status(201).send('Student record successfully created');
});

app.post('/todos', async (req: express.Request, res: express.Response) => {
  const { title, content, tags, author } = req.body;
  if (!title || !author) {
    return res.status(400).send({ message: 'Title and author are required' });
  }
  if (title.length < 5 || title.length > 40) {
    return res.status(400).send({ message: 'Title must be between 5 and 40 characters' });
  }
  const createdTodo = await TodoModel.create({
    title,
    content,
    tags,
    author,
  });
  return res.status(201).send(createdTodo);
});

app.get('/todos', async (req: express.Request, res: express.Response) => {
  const todos = await TodoModel.find();
  return res.status(200).send(todos);
});

// Update a particular item
app.put('/todos/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const todo = await TodoModel.findById(id);
  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  if (title) {
    todo.title = title;
  }
  if (content) {
    todo.content = content;
  }
  await todo.save();
  return res.status(200).send(todo);
});

app.listen(5672, async () => {
  console.log('Server is running at http://localhost:5672');
  await mongoose.connect('mongodb://127.0.0.1/hmp-todo-app');
  console.log('Connected to MongoDB');
});

export {};
