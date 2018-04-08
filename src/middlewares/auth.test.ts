import { Auth } from './auth';
import { use,should,expect } from 'chai';
import { DataBase } from '../database';
import * as chaiPromised from 'chai-as-promised';
import { Session } from '../database/session';

describe('Auth middleware test',()=>{
  let db:DataBase;

  let sendedObjs;
  let statusObj;
  let response:any={
    send:(res)=>{sendedObjs = res},
    json:(res)=>{sendedObjs = res},
    status:(sta)=>{statusObj = sta ;return {send:(res)=>{sendedObjs = res}}}
  }
  let nextCalled=0;
  let next=()=>{
    console.log('test');
    nextCalled++;
  }

  before(function(){
    return new Promise<any>((resolve,reject)=>{
      use(chaiPromised);
      should();
      db = new DataBase('fflix-tests');
      db.connect().then(()=>{
        resolve();
      }).catch(()=>{
        reject();
      });
    })
  });

  before(async()=>{
    let session = await Session.save({token:'123456789'});
  });

  it('Should call next when have the heading authorization with a valid token',async()=>{
    await Auth({get:()=>{return '123456789'}},response,next);
    expect(nextCalled).to.equal(1);
  });

  it('Should return 401 when the token is invaliding',async()=>{
    await Auth({get:()=>{return '12345'}},response,next);
    expect(statusObj).to.equal(401);
    expect(sendedObjs.error).to.be.a('string')
  });

  after(async function(){
    await Session.remove({});
    db.disconect();
  });
});
