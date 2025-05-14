"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var book_controller_1 = require("../controllers/book.controller");
var router = express_1.default.Router();
var upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/books', book_controller_1.getBooks);
router.get('/books/:id', book_controller_1.getBook);
router.post('/books', book_controller_1.addBook);
router.put('/books/:id', book_controller_1.updateBook);
router.delete('/books/:id', book_controller_1.deleteBook);
router.post('/books/import', upload.single('file'), book_controller_1.importBooksFromCSV);
exports.default = router;
