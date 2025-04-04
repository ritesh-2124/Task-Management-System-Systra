const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

app.use(express.json());

const corsOptions = {
  origin: ["*"], 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};

app.use(cors(corsOptions));


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
