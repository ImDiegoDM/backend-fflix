import { UserController } from './userController';
import { Users,IUser } from '../database/user';
import { Session,ISession } from '../database/session';
import { SessionController } from './sessionController';
import { DataBase } from '../database';
import { Table } from '../database/table';
import { use,should,expect } from 'chai';
import * as chaiPromised from 'chai-as-promised';
import { Schema,connection } from 'mongoose';
import * as bcrypt from 'bcryptjs';

describe('Session Controller test',()=>{
  let db:DataBase;
  let sessionController:SessionController;
  let user;
  let salt = bcrypt.genSaltSync(15);

  let sendedObjs;
  let statusObj;
  let response={
    send:(res)=>{sendedObjs = res},
    json:(res)=>{sendedObjs = res},
    status:(sta)=>{statusObj = sta ;return {send:(res)=>{sendedObjs = res}}}
  }

  before(function(){
    return new Promise<any>((resolve,reject)=>{
      use(chaiPromised);
      should();
      sessionController = new SessionController();
      db = new DataBase('fflix-tests');
      db.connect().then(()=>{
        resolve();
      }).catch(()=>{
        reject();
      });
    })
  });

  before(async function(){
    this.timeout(5000);
    let userData = {
      name:'Test',
      login:'test',
      password:bcrypt.hashSync('123456', salt),
      email:'test@gmail.com',
      list:[]
    }

    let user = await Users.save<IUser>(userData);

  });

  it('Should create session correctly',async()=>{
    await sessionController.create({body:{login:'test',password:'123456'}},response);
    let session = await Session.findOne({token:sendedObjs.token});
    expect(session).to.not.be.null;
  }).timeout(10000);

  it('Should return status 401 when credential are incorect ',async()=>{
    await sessionController.create({body:{login:'dfsd',password:'123456789'}},response);
    let session = await Session.findOne({token:sendedObjs.token});
    expect(sendedObjs).to.be.a('string');
    expect(statusObj).to.equal(401);
  }).timeout(10000);

  it('Should generate token correcty',()=>{
    let token = sessionController.generateToken(50);
    expect(token).to.be.length(50);
  });

  after(async function(){
    this.timeout(5000);
    await Session.remove({});
    await Users.remove({});
    db.disconect();
  });
})
