"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var book_routes_1 = __importDefault(require("./routes/book.routes"));
var logger_1 = require("./middleware/logger");
var errorHandler_1 = require("./middleware/errorHandler");
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(logger_1.logger);
// Book Routes
app.use('/api', book_routes_1.default);
// Error Handler
app.use(errorHandler_1.errorHandler);
// Start server
var PORT = 5000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
