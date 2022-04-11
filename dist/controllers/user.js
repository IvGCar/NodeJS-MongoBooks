"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield user_1.default.findOne({ username }).exec();
    if (!user) {
        return res.status(400).json({
            error: 'User not found'
        });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            error: 'Invalid password or username'
        });
    }
    const token = jsonwebtoken_1.default.sign({ username, id: user.id }, config_1.default.secrets.token);
    return res.status(200).json({
        message: 'Login Succesfull',
        token
    });
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const salt = yield bcrypt_1.default.genSalt(10);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const existentUser = yield user_1.default.findOne({ username }).exec();
    if (existentUser) {
        return res.status(400).json({
            error: 'User name already in use, please type another'
        });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Your password must have between 6 and 16 characters, at least one number and at least one special character. Please try other password'
        });
    }
    const user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        password: passwordHash,
    });
    const result = yield user.save();
    return res.status(200).json({
        message: 'User registered',
        user: {
            id: result.id,
            username: result.username,
        }
    });
});
exports.default = { register, login };
