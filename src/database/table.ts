import {Schema,model,Model,Document} from 'mongoose';

export class Table{
  protected dbmodel:Model<Document>;
  protected name:string;

  constructor(name,scheme:Schema){
    this.name = name;
    this.dbmodel = model(this.name,scheme);
  }

  save<T extends Document>(dbData):Promise<T>{
    let data = <T>new this.dbmodel(dbData);
    return new Promise<T>((resolve,reject)=>{
      let err = data.validateSync();
      if(err) reject(err);
      data.save().then((doc)=>{
        resolve(doc);
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  remove(args):Promise<any>{
    return new Promise<any>((resolve,reject)=>{
      this.dbmodel.remove(args,(err)=>{
        if(err) reject(err);
        else resolve();
      });
    })
  }

  update(args,argsUpdate):Promise<any>{
    return new Promise<any>((resolve,reject)=>{
      this.dbmodel.update(args,argsUpdate,(err)=>{
        if(err) reject(err);
        else resolve();
      })
    });
  }

  findOne<T>(args:any):Promise<T>{
    return new Promise<T>((resolve, reject) =>{
      this.dbmodel.findOne(args, (err: any, row:T) => {
        if(err) reject(err);
        resolve(row);
      });
    });
  }

  find<T>(args:any,orderBy?:string):Promise<T>{
    return new Promise<T>((resolve, reject)=>{
      this.dbmodel.find(args,(err:any,row:T)=>{
        if(err) reject(err);
        resolve(row);
      }).sort(orderBy);
    });
  }
}
