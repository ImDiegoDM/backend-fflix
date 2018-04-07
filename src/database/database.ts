import {Schema,model,Model,Document} from 'mongoose';

export class DataBase{
  protected dbmodel:Model<Document>;
  protected name:string;

  constructor(scheme:Schema){
    this.dbmodel = model(this.constructor.name,scheme);
  }

  save<T extends Document>(dbData):T{
    let data = <T>new this.dbmodel(dbData);
    data.save();
    return data;
  }

  async findOne<T>():Promise<T>{
    return await new Promise<T>((resolve, reject) =>{
      this.dbmodel.findOne({}, (err: any, user:T) => {
        resolve(user);
      });
    });
  }
}
