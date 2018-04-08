import { UserController } from './userController'
import { use,should,expect } from 'chai';
import { Users,IUser } from '../database/user';
import { DataBase } from '../database';
import * as chaiPromised from 'chai-as-promised';
import { SessionController } from './sessionController';

describe('User Controller',()=>{
  let db:DataBase;
  let userController:UserController;

  let sendedObjs;
  let response:any={
    send:(res)=>{sendedObjs = res},
    json:(res)=>{sendedObjs = res},
    status:()=>{return {send:(res)=>{sendedObjs = res}}}
  }

  before(function(){
    return new Promise<any>((resolve,reject)=>{
      use(chaiPromised);
      should();
      userController = new UserController();
      db = new DataBase('fflix-tests');
      db.connect().then(()=>{
        resolve();
      }).catch(()=>{
        reject();
      });
    })
  });

  it('Should create the user and encrypt the password correctly',async ()=>{
    await userController.register({body:{login:'test',name:'Test Test',email:'test@test.com',password:'123456'}},response);
    let user = await Users.findOne<IUser>({name:'Test Test'});
    expect(user).to.not.be.null;
    expect(user.password).to.not.equal('123456');
  }).timeout(10000);

  it('Should return the user',async()=>{
    await new SessionController().create({body:{login:'test',password:'123456'}},response);
    await userController.getUser({get:()=>{return sendedObjs.token }},response);
    expect(sendedObjs.name).to.equal('Test Test');
  }).timeout(5000);

  it('Should check login and password correctly',async()=>{
    let user = await UserController.authenticate('test','123456');
    expect(user).to.not.be.null;
  }).timeout(5000)

  after(async function(){
    await Users.remove({});
    db.disconect();
  });
})
