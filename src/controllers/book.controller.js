"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooksFromCSV = exports.deleteBook = exports.updateBook = exports.addBook = exports.getBook = exports.getBooks = void 0;
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var csv_parser_1 = __importDefault(require("csv-parser"));
var books = [
    { id: (0, uuid_1.v4)(), title: 'Book One', author: 'Author A', year: 2022 },
    { id: (0, uuid_1.v4)(), title: 'Book Two', author: 'Author B', year: 2021 },
];
// GET all books
var getBooks = function (req, res) {
    res.json(books);
};
exports.getBooks = getBooks;
// GET a specific book by ID
var getBook = function (req, res) {
    var id = req.params.id;
    var book = books.find(function (b) { return b.id === id; });
    if (!book) {
        return res.status(404).send({ message: 'Book not found' });
    }
    res.json(book);
};
exports.getBook = getBook;
// POST a new book
var addBook = function (req, res) {
    var _a = req.body, title = _a.title, author = _a.author, year = _a.year;
    var newBook = { id: (0, uuid_1.v4)(), title: title, author: author, year: Number(year) };
    books.push(newBook);
    res.status(201).json(newBook);
};
exports.addBook = addBook;
// PUT update a book by ID
var updateBook = function (req, res) {
    var id = req.params.id;
    var _a = req.body, title = _a.title, author = _a.author, year = _a.year;
    var bookIndex = books.findIndex(function (b) { return b.id === id; });
    if (bookIndex === -1) {
        return res.status(404).send({ message: 'Book not found' });
    }
    books[bookIndex] = { id: id, title: title, author: author, year: Number(year) };
    res.json(books[bookIndex]);
};
exports.updateBook = updateBook;
// DELETE a book by ID
var deleteBook = function (req, res) {
    var id = req.params.id;
    var bookIndex = books.findIndex(function (b) { return b.id === id; });
    if (bookIndex === -1) {
        return res.status(404).send({ message: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.status(204).send();
};
exports.deleteBook = deleteBook;
// IMPORT books from CSV
var importBooksFromCSV = function (req, res) {
    var results = [];
    if (!req.file) {
        return res.status(400).json({ message: 'CSV file is required.' });
    }
    fs_1.default.createReadStream(req.file.path)
        .pipe((0, csv_parser_1.default)())
        .on('data', function (data) {
        if (data.title && data.author && data.year) {
            var newBook = {
                id: (0, uuid_1.v4)(),
                title: data.title,
                author: data.author,
                year: parseInt(data.year, 10),
            };
            results.push(newBook);
        }
    })
        .on('end', function () {
        books.push.apply(books, results);
        fs_1.default.unlinkSync(req.file.path); // Cleanup uploaded file
        res.status(201).json({ message: 'Books imported successfully', count: results.length, books: results });
    })
        .on('error', function (err) {
        res.status(500).json({ message: 'Failed to import books from CSV', error: err.message });
    });
};
exports.importBooksFromCSV = importBooksFromCSV;
