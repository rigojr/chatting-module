import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World with TypeScript!');
});

mongoose.connect(process.env.MONGO_URI || '', { })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
