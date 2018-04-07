import { Movie,IMovie } from '../database/movie';

export class MovieController{

  public index=async (request:any,response:any)=>{
    try{
      let movies = await Movie.find<IMovie[]>({},'categories');
      response.send(movies);
    }catch(err){
      response.status(500).send(err.message);
    }
  }

  public indexByCategorie = async (request:any,response:any)=>{
    try{
      let movies = await Movie.find<IMovie[]>({categories:request.params.categorie},'categories');
      response.send(movies);
    }catch(err){
      response.status(500).send(err.message);
    }
  }

  public save = async (request:any,response:any)=>{
    try{
      let body = request.body;
      console.log(body);
      let movie:IMovie ={
        categories:body.categories.split(';'),
        name:body.name,
        trailer:body.trailer,
        evaluation:0,
        cast:body.cast.split(';')
      }
      let movieDbObj = await Movie.save(movie);
      response.json(movieDbObj);
    }catch(err){
      response.status(500).send(err.message);
    }
  }
}
