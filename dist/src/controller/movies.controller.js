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
Object.defineProperty(exports, "__esModule", { value: true });
const movies_service_1 = require("../service/movies.service");
class UserController {
    constructor(movieService) {
        this.movieService = movieService;
        this.find = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const data = {
                    page: Number((_a = req.query.page) !== null && _a !== void 0 ? _a : 1),
                    limit: Number((_b = req.query.limit) !== null && _b !== void 0 ? _b : 20),
                    sortKey: (_c = req.query.sortKey) !== null && _c !== void 0 ? _c : 'title',
                    search: (_e = (_d = req.query.search) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : '',
                    sortDirection: (_f = req.query.sortDirection) !== null && _f !== void 0 ? _f : 'asc',
                    searchKey: (_g = req.query.searchKey) !== null && _g !== void 0 ? _g : 'title'
                };
                if (!data.page || !data.limit)
                    return res.send('Cannot find body');
                const find = yield this.movieService.find(data);
                res.json(find);
            }
            catch (err) {
                res.status(400).json({ err: err.message });
            }
        });
    }
}
exports.default = new UserController(new movies_service_1.MovieService());
