import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from '../src/routes/user.router';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Hello World with TypeScript!');
});

mongoose.connect(process.env.MONGO_URI || '', { })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
