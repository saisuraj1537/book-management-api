import { Request, Response } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import { v4 as uuidv4 } from 'uuid';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const books: Book[] = [];

// GET /books
export const getBooks = (req: Request, res: Response): void => {
  res.json(books);
};

// GET /books/:id
export const getBook = (req: Request<{ id: string }>, res: Response): void => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  res.json(book);
};

// POST /books
export const addBook = (req: Request, res: Response): void => {
  const { title, author, year } = req.body;

  const newBook: Book = {
    id: uuidv4(),
    title,
    author,
    year: Number(year),
  };

  books.push(newBook);
  res.status(201).json({ message: 'Book added', book: newBook });
};

// PUT /books/:id
export const updateBook = (req: Request<{ id: string }>, res: Response): void => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  const updatedBook = { ...books[index], ...req.body };
  books[index] = updatedBook;
  res.json({ message: 'Book updated', book: updatedBook });
};

// DELETE /books/:id
export const deleteBook = (req: Request<{ id: string }>, res: Response): void => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted', book: deletedBook });
};

// POST /books/import
export const importBooksFromCSV = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No CSV file uploaded' });
    return;
  }

  const importedBooks: Book[] = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row: any) => {
      importedBooks.push({
        id: uuidv4(),
        title: row.title,
        author: row.author,
        year: Number(row.year),
      });
    })
    .on('end', () => {
      books.push(...importedBooks);
      res.status(200).json({
        message: 'Books imported successfully',
        count: importedBooks.length,
        books: importedBooks,
      });
    })
    .on('error', (err) => {
      res.status(500).json({ message: 'Error processing CSV', error: err.message });
    });
};
