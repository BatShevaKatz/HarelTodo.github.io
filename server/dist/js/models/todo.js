"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });
exports.default = mongoose_1.model("Todo", todoSchema);
