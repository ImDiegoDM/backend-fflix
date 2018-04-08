import { UserController } from './userController';
import { Session,ISession } from '../database/session';

export class SessionController{

  public create = async (request:any,response:any)=>{
    let body = request.body;
    let authenticated = await UserController.authenticate(body.login,body.password);
    if(authenticated){

      let findUniqueToken=true;
      let sessionObj;
      do{
        let session = {
          token:this.generateToken(500),
          user:authenticated
        }
        try{
          sessionObj = await Session.save(session);
        }catch{
          findUniqueToken = false;
        }
      }while(!findUniqueToken)
      response.send(sessionObj);
    }else{
      console.log('user not finded')
      response.status(401).send('Ops! yours credentials are incorect');
    }
  }

  public generateToken(length:number):string{
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%¨&*(=+-/.,|';
    let string = '';
    for (let i = 0; i < length; i++) {
        string+=chars[Math.round(Math.random()*chars.length)];
    }
    return string;
  }
}
