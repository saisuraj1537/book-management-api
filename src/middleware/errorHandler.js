"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
};
exports.errorHandler = errorHandler;
