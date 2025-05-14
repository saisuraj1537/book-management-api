import express from 'express';
import multer from 'multer';
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  importBooksFromCSV,
} from '../controllers/book.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooksFromCSV);

export default router;
