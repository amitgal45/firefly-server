// user.model.ts
import { Document, Schema, model } from 'mongoose';


// Create the interface
export interface IMovie {
    title: string;
    rank: string;
    id: string;
    year?: number;
    director?: string|null;
    actors?: string[];
}
export interface IMovieDocument extends Document,IMovie {
    title: string;
    rank: string;
    id: string;
    year?: number;
    director?: string|null;
    actors?: string[];
}

// Create the schema
const MovieSchema = new Schema<IMovieDocument>({
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
    unique:true,
  },
  year: {
    type: Number,
  },
  director: {
    type:String
  },
  actors: {
    type:[String]
  }
});

// Create and export user model
export const MovieModel = model<IMovieDocument>("Movie", MovieSchema);
