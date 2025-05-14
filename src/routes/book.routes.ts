import express from 'express';
import multer from 'multer';
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  importBooksFromCSV,
  // debugBooks,
} from '../controllers/book.controller';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooksFromCSV);

// Debug route to inspect in-memory book array
// router.get('/debug', debugBooks);

export default router;
