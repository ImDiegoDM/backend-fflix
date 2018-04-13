import { UserController } from './userController';
import { Session,ISession } from '../database/session';

export class SessionController{

  public create = async (request:any,response:any)=>{
    let body = Object.assign({}, request.body);
    // console.log(body);
    let authenticated = await UserController.authenticate(body.login,body.password);
    console.log(authenticated);
    if(authenticated){
      try{
        let findUniqueToken=true;
        let sessionObj;
        do{
          let session = {
            token:this.generateToken(500),
            user:authenticated
          }
          try{
            sessionObj = await Session.save(session);
          }catch(err){
            findUniqueToken = false;
          }
        }while(!findUniqueToken)
        response.send(sessionObj);
      }catch(err){
        response.status(500).send(err);
      }
    }else{
      response.status(401).send('Ops! yours credentials are incorect');
    }
  }

  public generateToken(length:number):string{
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$';
    let string = '';
    for (let i = 0; i < length; i++) {
        string+=chars[Math.round(Math.random()*chars.length)];
    }
    return string;
  }
}
