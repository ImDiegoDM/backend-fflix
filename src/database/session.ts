import {Schema,model,Document} from 'mongoose';
import { Table } from './table';

export interface ISession extends Document{
  token:string;
  user:{
    name:string;
    login:string;
    email:string;
    list:{film:string}[];
  }
}

export const Session=new Table('Sessions',new Schema({
  token:String,
  user:{
    name:String,
    login:String,
    email:String,
    list:[{film:String}]
  }
}));
