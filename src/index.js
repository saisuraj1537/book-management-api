"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var book_routes_1 = __importDefault(require("./routes/book.routes"));
var app = (0, express_1.default)();
var PORT = 3000;
app.use(express_1.default.json());
app.use("/api/books", book_routes_1.default);
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
