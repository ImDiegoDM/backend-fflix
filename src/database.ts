import { connect,connection } from 'mongoose';

export class DataBase{
  database:string;

  constructor(database:string){
    this.database = database;
  }

  connect():Promise<any>{
    return new Promise<any>((resolve,reject)=>{
      connect('mongodb://localhost/'+this.database);
      connection.on('error', (err)=>{
        reject(err);
      });
      connection.once('open', function() {
        resolve();
      });
    })
  }

  disconect(){
    connection.close().then(()=>{
    });
  }
}
