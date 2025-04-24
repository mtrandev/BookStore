import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import { Book } from './models/bookmodels.js';
import authRoute from './routes/authRoute.js';
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js'; 

const PORT = 5555;
const mongoDBURL = 'mongodb+srv://milkotrandev:45Kluch8284@book-store.hm0rcfo.mongodb.net/?retryWrites=true&w=majority';

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

app.use('/', authRoute);
app.use('/books', booksRoute);
app.use('/users', userRoute); 

app.get('/', (req, res) => {
  res.status(234).send('Welcome to my Library');
});

app.put('/books/:id', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, author, publishYear, description } = req.body;
    const coverImage = req.file ? req.file.path : null;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishYear, description, coverImage },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Internal Server Error');
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
