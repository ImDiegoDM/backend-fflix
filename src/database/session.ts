import {Schema,model,Document} from 'mongoose';
import { Table } from './table';

export interface ISession extends Document{
  token:string;
  user:{
    name:string;
    login:string;
    email:string;
    list:any[];
  }
}

export const Session=new Table('Sessions',new Schema({
  token:{type:String,unique:true},
  user:{
    _id:String,
    name:String,
    login:String,
    email:String,
    list:[{_id:String,categories:[String],
    name:String,
    trailer:String,
    evaluation:Number,
    cast:[String],
    coverImage:String,
    sampleImage:String}]
  }
}));
