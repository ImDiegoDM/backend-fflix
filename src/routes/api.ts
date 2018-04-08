import { Routes } from './routes';

export class ApiRoutes extends Routes{
  group:string = '/api';
  public mountRoutes(){

    this.get('/movies','MovieController@index','auth');
    this.get('/movies/:categorie','MovieController@indexByCategorie','auth');
    this.post('/movie','MovieController@save','auth');

    this.get('/user','UserController@getUser','auth');

    this.post('/user','UserController@register');

    this.post('/login','SessionController@create');
  }
}
