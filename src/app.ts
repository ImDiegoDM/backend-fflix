import * as express from 'express';
import { ApiRoutes } from './routes/api';
import { connect,connection } from 'mongoose';

export class App{
  port:number;
  server:any;
  api:ApiRoutes;
  database:string='fflix';

  constructor(port:number){
    this.connectDB();
    this.port = port;
    this.server = express();
    this.api = new ApiRoutes(this.server);
    this.api.mountRoutes();
  }

  connectDB(){
    connect('mongodb://localhost/'+this.database);
    connection;
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function() {
      console.log('yay it works');
    });
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
