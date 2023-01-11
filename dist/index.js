"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./src/common/config/db.config");
const movie_router_1 = __importDefault(require("./src/router/movie.router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000;
app.use((0, cors_1.default)());
app.use('/', express_1.default.static('public'));
app.use('/movie', movie_router_1.default);
db_config_1.DB.Init().then(() => {
    console.log('Connected To MongoDB');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
