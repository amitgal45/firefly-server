"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
// user.model.ts
const mongoose_1 = require("mongoose");
// Create the schema
const MovieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
    },
    director: {
        type: String
    },
    actors: {
        type: [String]
    }
});
// Create and export user model
exports.MovieModel = (0, mongoose_1.model)("Movie", MovieSchema);
