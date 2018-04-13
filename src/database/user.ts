import {Schema,model,Document} from 'mongoose';
import { Table } from './table';

export interface IUser extends Document{
  name:string;
  login:string;
  password:string;
  email:string;
  list:any[];
}

export const Users=new Table('Users',new Schema({
  name:{type:String,required:true},
  login:{type:String,required:true,unique: true},
  password:{type:String,required:true},
  email:{type:String,required:true,unique: true},
  list:[{_id:String,categories:[String],
  name:String,
  trailer:String,
  evaluation:Number,
  cast:[String],
  coverImage:String,
  sampleImage:String}]
}));
