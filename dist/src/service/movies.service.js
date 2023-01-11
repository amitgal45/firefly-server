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
exports.MovieService = void 0;
const movie_model_1 = require("../common/model/movie.model");
class MovieService {
    find(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (value.searchKey === 'year' && value.search.length) {
                    const [data, count] = yield Promise.all([
                        movie_model_1.MovieModel.find({
                            [value.searchKey]: value.search
                        })
                            .sort({
                            [value.sortKey]: value.sortDirection
                        })
                            .skip((value.page - 1) * value.limit)
                            .limit(value.limit),
                        movie_model_1.MovieModel.find({
                            [value.searchKey]: value.search
                        }).count()
                    ]);
                    return { data, count };
                }
                else {
                    if (value.searchKey === 'year') {
                        const [data, count] = yield Promise.all([
                            movie_model_1.MovieModel.find()
                                .sort({
                                [value.sortKey]: value.sortDirection
                            })
                                .skip((value.page - 1) * value.limit)
                                .limit(value.limit),
                            movie_model_1.MovieModel.find().count()
                        ]);
                        return { data, count };
                    }
                    else {
                        const [data, count] = yield Promise.all([
                            movie_model_1.MovieModel.find({
                                [value.searchKey]: {
                                    $regex: value.search,
                                    $options: 'i'
                                }
                            })
                                .sort({
                                [value.sortKey]: value.sortDirection
                            })
                                .skip((value.page - 1) * value.limit)
                                .limit(value.limit),
                            movie_model_1.MovieModel.find({
                                [value.searchKey]: { $regex: value.search, $options: 'i' }
                            }).count()
                        ]);
                        return { data, count };
                    }
                }
                // const [data, count] = await Promise.all([
                //   (value.searchKey !== 'year'
                //     ? MovieModel.find({
                //         [value.searchKey]: {
                //           $regex: value.search,
                //           $options: 'i'
                //         }
                //       })
                //     : MovieModel.find({
                //         [value.searchKey]: value.search
                //       })
                //   )
                //     .sort({
                //       [value.sortKey]: value.sortDirection
                //     })
                //     .skip((value.page - 1) * value.limit)
                //     .limit(value.limit),
                //   value.searchKey !== 'year'
                //     ? MovieModel.find({
                //         [value.searchKey]: { $regex: value.search, $options: 'i' }
                //       }).count()
                //     : MovieModel.find({
                //         [value.searchKey]: value.search
                //       }).count()
                // ]);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.MovieService = MovieService;
