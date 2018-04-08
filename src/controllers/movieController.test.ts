import { DataBase } from '../database';
import { Table } from '../database/table';
import { use,should,expect } from 'chai';
import * as chaiPromised from 'chai-as-promised';
import { Schema,connection } from 'mongoose';
import { Movie,IMovie } from '../database/movie';
import { MovieController } from './movieController';

describe('Movie Controller test',()=>{
  let db:DataBase;
  let movieController:MovieController;
  let sendedObjs;
  let response={
    send:(res)=>{sendedObjs = res},
    json:(res)=>{sendedObjs = res}
  }

  before(function(){
    this.timeout(5000);
    return new Promise<any>((resolve,reject)=>{
      use(chaiPromised);
      should();
      movieController = new MovieController();
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
    let movie1 = {
      categories:["Ação","Aventura","Sci-Fi"],
      name:"Ready Player One",
      trailer:"trailer.url",
      evaluation:0,
      cast:["Tye Sheridan","Olivia Cooke","Ben Mendelsohn"]
    }
    let movie2 = {
      categories:["Aventura","Sci-Fi"],
      name:"Black Panther",
      trailer:"trailer.url",
      evaluation:0,
      cast:["Chadwick Boseman","Michael B. Jordan","Lupita Nyong'o"]
    }
    let movie3 = {
      categories:["Sci-Fi"],
      name:"Pacific Rim: Uprising",
      trailer:"trailer.url",
      evaluation:0,
      cast:["John Boyega","Scott Eastwood","Cailee Spaeny"]
    }

    await Movie.save(movie1);
    await Movie.save(movie2);
    await Movie.save(movie3);
  })

  it('Should return movies correctly',async ()=>{
    await movieController.index('',response);
    expect(sendedObjs[0]).have.property('name','Black Panther');
    expect(sendedObjs[1]).have.property('name','Pacific Rim: Uprising');
    expect(sendedObjs[2]).have.property('name','Ready Player One');
  });

  it('Should return movies by categories correctly',async()=>{
    await movieController.indexByCategorie({params:{categorie:"Aventura"}},response);
    expect(sendedObjs[0]).have.property('name','Black Panther');
    expect(sendedObjs[1]).have.property('name','Ready Player One');
  });

  it('Should save object correctly',async()=>{
    let body={
      categories:'Ação;Aventura',
      name:'Tomb Raider',
      trailer:"trailer.url",
      cast:'Alicia Vikander;Dominic West;Walton Goggins'
    }
    await movieController.save({body:body},response);
    let movie = await Movie.findOne<IMovie>({name:'Tomb Raider'});
    expect(movie).to.have.property('name','Tomb Raider');
  });

  after(async function(){
    this.timeout(5000);
    await Movie.remove({});
    db.disconect();
  });
})
