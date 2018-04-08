 import { expect,use,should,assert } from 'chai';
 import { } from 'mocha';
 import * as chaiPromised from 'chai-as-promised';
 import { DataBase } from '../database';
 import { Table } from './table';
 import { Schema } from 'mongoose';

describe('Table tests',()=>{
  let db:DataBase;
  let table:Table;

  before(function(){
    return new Promise<any>((resolve,reject)=>{
      use(chaiPromised);
      should();

      db = new DataBase('fflix-tests');
      table = new Table('test-table',new Schema({
        properti:String
      }))
      db.connect().then(()=>{
        resolve();
      }).catch(()=>{
        reject();
      });

    })
  });

  it('should save the row correctly',async ()=>{
    let row = await table.save({properti:"test"});
    row.should.have.property('properti',"test");
  });

  it('find the row correctly',async ()=>{
    let obj = await table.findOne({properti:"test"});
    obj.should.have.property('properti',"test");
  });

  before(async ()=>{
    await table.save({properti:"remove"});
  });

  it('should remove iten correctly',async ()=>{
    await table.remove({properti:"remove"});
    let obj = await table.findOne({properti:"remove"});
    expect(obj).to.be.null;
  })

  after(async ()=>{
    await table.remove({});
    db.disconect();
  });
})
