"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var logger = function (req, res, next) {
    console.log("".concat(req.method, " ").concat(req.url));
    next();
};
exports.logger = logger;
