import { Users, IUser} from '../database/user';
import * as bcrypt from 'bcryptjs';
import { Session,ISession } from '../database/session';

export class UserController{
  salt = bcrypt.genSaltSync(15);

  public register = async (request:any,response:any)=>{
    let body = request.body;

    let login = await Users.find({login:body.login});
    let email = await Users.find({email:body.email});

    if(!body.password){
      response.send('password is missing');
      return;
    }

    let user:IUser ={
      name:body.name,
      login:body.login,
      password:bcrypt.hashSync(body.password, this.salt),
      email:body.email,
      list:[]
    }

    let userObj;
    try{
      userObj = await Users.save(user);
      response.json(userObj);
    }catch(err){
      response.send(err);
    }
  }

  public static authenticate(login,password):Promise<IUser>{
    return new Promise<IUser>(async (resolve,reject)=>{
      try{
        let user = await Users.findOne<IUser>({login:login});
        if(bcrypt.compareSync(password, user.password)){
          resolve(user);
        }else{
          resolve(null);
        }
      }catch(err){
        console.log(err.message)
        resolve(null);
      }
    });
  }

  public getUser = async (request:any,response:any)=>{
    let token = request.get('authorization');
    try{
      let session = await Session.findOne<ISession>({token:token});
      response.json(session.user);
    }catch{
      response.status(400).send('token not find');
    }
  }
}
