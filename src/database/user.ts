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
  name:{type:String,required:true},
  login:{type:String,required:true,unique: true},
  password:{type:String,required:true},
  email:{type:String,required:true,unique: true},
  list:[{film:String}]
}));
