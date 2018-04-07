import {Schema,model,Document} from 'mongoose';
import { DataBase } from './database';

export interface IUser extends Document{
  name:string;
  login:string;
  password:string;
  email:string;
  list:string[];
}

export const Users=new DataBase(new Schema({
  name:String,
  login:String,
  password:String,
  email:String,
  list:[{film:String}]
}));
