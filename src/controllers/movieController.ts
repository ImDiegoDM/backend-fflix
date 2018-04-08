import { Movie,IMovie } from '../database/movie';

export class MovieController{

  public index=async (request:any,response:any)=>{
    let movies = await Movie.find<IMovie[]>({},'name');
    response.send(movies);
  }

  public indexByCategorie = async (request:any,response:any)=>{
    let movies = await Movie.find<IMovie[]>({categories:request.params.categorie},'name');
    response.send(movies);
  }

  public save = async (request:any,response:any)=>{
    let body = request.body;
    let movie ={
      categories:body.categories.split(';'),
      name:body.name,
      trailer:body.trailer,
      evaluation:0,
      cast:body.cast.split(';')
    }
    let movieDbObj = await Movie.save(movie);
    response.json(movieDbObj);
  }
}
