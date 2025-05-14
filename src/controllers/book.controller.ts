import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import csv from 'csv-parser';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [
  { id: uuidv4(), title: 'Book One', author: 'Author A', year: 2022 },
  { id: uuidv4(), title: 'Book Two', author: 'Author B', year: 2021 },
];

// GET all books
export const getBooks = (req: Request, res: Response) => {
  res.json(books);
};

// GET a specific book by ID
export const getBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send({ message: 'Book not found' });
  }

  res.json(book);
};

// POST a new book
export const addBook = (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  const newBook = { id: uuidv4(), title, author, year: Number(year) };

  books.push(newBook);
  res.status(201).json(newBook);
};

// PUT update a book by ID
export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).send({ message: 'Book not found' });
  }

  books[bookIndex] = { id, title, author, year: Number(year) };
  res.json(books[bookIndex]);
};

// DELETE a book by ID
export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).send({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
};

// IMPORT books from CSV
export const importBooksFromCSV = (req: Request, res: Response) => {
  const results: Book[] = [];

  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required.' });
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      if (data.title && data.author && data.year) {
        const newBook: Book = {
          id: uuidv4(),
          title: data.title,
          author: data.author,
          year: parseInt(data.year, 10),
        };
        results.push(newBook);
      }
    })
    .on('end', () => {
      books.push(...results);
      fs.unlinkSync(req.file.path); // Cleanup uploaded file
      res.status(201).json({ message: 'Books imported successfully', count: results.length, books: results });
    })
    .on('error', (err) => {
      res.status(500).json({ message: 'Failed to import books from CSV', error: err.message });
    });
};
