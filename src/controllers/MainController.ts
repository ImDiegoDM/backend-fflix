import { Users,IUser } from '../database/user';

export class MainController{
  public index=(request:any,response:any)=>{
    // let user = Users.save<IUser>({
    //   name:'Diego',
    //   password:'123',
    //   email:'diego@diego.com',
    //   list:[],
    //   login:'test'
    // });
    let user = Users.findOne<IUser>();
    user.then((data)=>{
      response.send('Hello World! the user name is '+data);
    }).catch((err)=>{
      response.send('error:'+err);
    })
  }
}
