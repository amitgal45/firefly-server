import { IParams } from '../..';
import { Request, Response } from 'express';
import {
  MovieKeys,
  MovieService,
  SortDirection
} from '../service/movies.service';

class UserController {
  constructor(private readonly movieService: MovieService) {}
  find = async (req: Request, res: Response) => {
    try{
    const data = {
      page: Number(req.query.page??1),
      limit: Number(req.query.limit??20),
      sortKey: req.query.sortKey as MovieKeys??'title',
      search: req.query.search?.toString() ?? '',
      sortDirection: req.query.sortDirection as SortDirection??'asc',
      searchKey: req.query.searchKey as MovieKeys??'title'
    };
    if (!data.page || !data.limit) return res.send('Cannot find body');
    const find = await this.movieService.find(data);
    res.json(find);
  }
  catch(err:any){
    res.status(400).json({err:err.message})
  }
  };
}

export default new UserController(new MovieService());
