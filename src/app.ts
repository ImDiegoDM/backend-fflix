import * as express from 'express';
import { ApiRoutes } from './routes/api';
import { DataBase } from  './database';
import * as bodyParser from 'body-parser';


export class App{
  port:number;
  server:any;
  api:ApiRoutes;
  db:DataBase;

  constructor(port:number){
    this.db = new DataBase('fflix');
    this.db.connect();
    this.port = port;
    this.server = express();
    this.server.use(bodyParser.json()); // for parsing application/json
    this.server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.api = new ApiRoutes(this.server);
    this.api.mountRoutes();
  }

  public StartServer(){
    this.server.listen(this.port, (err:any) => {
      if (err) {
        return console.log(err)
      }
      console.log(`The build is finished`);
      return console.log(`Back End server is listening on ${this.port}`)
    });
  }


}
