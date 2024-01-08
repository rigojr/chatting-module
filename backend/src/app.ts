import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from '../src/routes/user.router';
import conversationRouter from '../src/routes/conversation.router';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors()); // FIXME: for testing purpose.
app.use(express.json());
app.use(userRouter);
app.use(conversationRouter);

app.get('/', (req, res) => {
  res.send('Hello World with TypeScript!');
});

mongoose.connect(process.env.MONGO_URI || '', { })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
