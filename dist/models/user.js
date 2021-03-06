"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('User', UserSchema);
