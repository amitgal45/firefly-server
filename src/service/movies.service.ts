import { IParams } from '../..';
import { IMovie, MovieModel } from '../common/model/movie.model';

export type MovieKeys = keyof Required<IMovie>;
export type SortDirection = 'asc' | 'desc';
export class MovieService {
  async find(value: IParams) {
    try {
      if(value.searchKey === 'year' && value.search.length){
        const [data,count] = await Promise.all([
          MovieModel.find({
            [value.searchKey]: value.search
          })
          .sort({
            [value.sortKey]: value.sortDirection
          })
          .skip((value.page - 1) * value.limit)
          .limit(value.limit),
          MovieModel.find({
            [value.searchKey]: value.search
          }).count()
        ])
        return { data, count };

      }
      else {
        if(value.searchKey === 'year'){
          const [data,count] = await Promise.all([
            MovieModel.find()
            .sort({
              [value.sortKey]: value.sortDirection
            })
            .skip((value.page - 1) * value.limit)
            .limit(value.limit),
            MovieModel.find().count()
            
          ])
          return { data, count };
        }
        else{
          const [data,count] = await Promise.all([
            MovieModel.find({
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
            MovieModel.find({
              [value.searchKey]: { $regex: value.search, $options: 'i' }
            }).count()
            
          ])
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

    } catch (err) {
      throw err;
    }
  }
}
