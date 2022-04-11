"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("./routes/books"));
const user_1 = __importDefault(require("./routes/user"));
const middleware_1 = __importDefault(require("./controllers/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.default)();
mongoose_1.default.connect(config_1.default.mongo.url)
    .then(() => {
    logger_1.default.info('MongoDB connected!');
})
    .catch((error) => {
    logger_1.default.error(error.message, console.error);
});
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
router.use((req, res, next) => {
    logger_1.default.info(`METHOD: [${req.method}] - URL - [${req.url}] - IP[${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logger_1.default.info(`METHOD: [${req.method}] - URL - [${req.url}] - STATUS [${res.statusCode}] - IP[${req.socket.remoteAddress}]`);
    });
    next();
});
router.use('/api', user_1.default);
router.use('/api', middleware_1.default.verifyTokens, books_1.default);
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => {
    logger_1.default.info(`Server is running on ${config_1.default.server.hostname}:${config_1.default.server.port}`);
});
// logger.error('Error');
// logger.info('Info');
// logger.info(config.server.hostname);
// logger.info(config.server.port.toString())
