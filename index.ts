import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DB } from './src/common/config/db.config';
import movieRouter from './src/router/movie.router';
import { MovieKeys, SortDirection } from './src/service/movies.service';
import cors from 'cors';

export interface IParams {
  page: number;
  limit: number;
  sortKey:MovieKeys;
  sortDirection:SortDirection;
  search:string;
  searchKey:MovieKeys;
}

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) ?? 3000;
app.use(cors())
app.use('/', express.static('public'))
app.use('/movie', movieRouter);
DB.Init().then(() => {
  console.log('Connected To MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
