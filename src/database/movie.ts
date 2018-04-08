import {Schema,model,Document} from 'mongoose';
import { Table } from './table';

export interface IMovie extends Document{
  categories:string[];
  name:string;
  trailer:string;
  evaluation:number;
  cast:string[];
}

export const Movie=new Table('Movies',new Schema({
  categories:[String],
  name:String,
  trailer:String,
  evaluation:Number,
  cast:[String],
}));
