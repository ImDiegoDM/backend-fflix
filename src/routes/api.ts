import { Routes } from './routes';

export class ApiRoutes extends Routes{
  group:string = '/api';
  public mountRoutes(){
    this.get('/','MainController@index');
    this.get('/second','SecondController@index');
  }
}
