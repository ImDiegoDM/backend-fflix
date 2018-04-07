import {Schema,model,Document} from 'mongoose';
import { Table } from './table';

export interface IUser{
  name:string;
  login:string;
  password:string;
  email:string;
  list:{film:string}[];
}

export const Users=new Table('Users',new Schema({
  name:String,
  login:String,
  password:String,
  email:String,
  list:[{film:String}]
}));
