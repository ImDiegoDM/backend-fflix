import { Routes } from './routes';

export class ApiRoutes extends Routes{
  group:string = '/api';
  public mountRoutes(){

    this.get('/','MainController@index','auth');
    this.get('/second','SecondController@index');

    this.get('/movies','MovieController@index');
    this.get('/movies/:categorie','MovieController@indexByCategorie');
    this.post('/movie','MovieController@save');

  }
}
