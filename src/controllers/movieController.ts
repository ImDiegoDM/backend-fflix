import { Movie,IMovie } from '../database/movie';
import { Session,ISession } from '../database/session';
import { Users,IUser} from '../database/user';

export class MovieController{


  public index=async (request:any,response:any)=>{
    let movies = await Movie.find<IMovie[]>({},'name');
    response.send(movies);
  }

  public indexByCategorie = async (request:any,response:any)=>{
    let movies = await Movie.find<IMovie[]>({categories:request.params.categorie},'name');
    response.send(movies);
  }

  public addList = async(request:any,response:any)=>{
    let token = request.get('authorization');
    try{
      let session = await Session.findOne<ISession>({token:token});
      let movie = await Movie.findOne<IMovie>({_id:request.params.movieId});
      let user = await Users.findOne<IUser>({_id:(<any>session.user)._id});
      for (let i = 0; i < user.list.length; i++) {
          if(user[i]._id == movie._id) throw new Error('alredy in list')
      }
      user.list=[...user.list,movie];
      user.save();
      response.json(user);
    }catch(error){
      response.status(400).send(error);
    }
  }

  public save = async (request:any,response:any)=>{
    let body = request.body;
    console.log(request);
    let movie ={
      categories:body.categories.split(';'),
      name:body.name,
      trailer:body.trailer,
      evaluation:0,
      cast:body.cast.split(';'),
      coverImage:request.files['cover'][0].filename,
      sampleImage:request.files['sample'][0].filename
    }
    let movieDbObj = await Movie.save(movie);
    response.json(movieDbObj);
  }
}
