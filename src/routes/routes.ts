/*
 Base class for Routes
*/
import {Controller} from '../controllers/Controller';
import {middlewares} from '../middlewares/middlewares';

export class Routes{
  group:string;
  constructor(protected server:any){}

  public mountRoutes(){
  }

  public get(endpoint:string,handler:string,middleware?:string){
    if(middleware) this.server.get(this.group+endpoint,middleware[middleware],this.getHandler(handler));
    else this.server.get(this.group+endpoint,this.getHandler(handler));
  }

   /**
    Get controller function from string
    ex: MainController@index return the index function from MainController
    */
  public getHandler(handler:string):Promise<any>{
    let splited = handler.split('@');
    let controllerName = splited[0];
    let funcName = splited[1];
    console.log(this.getControllerIndex(controllerName));
    const  controller = new Controller.Controllers[this.getControllerIndex(controllerName)]();
    console.log(controller)
    return controller[funcName];
  }

  public getControllerIndex(name:string):number{
    for (let i = 0; i < Controller.Controllers.length; i++) {
      console.log(Controller.Controllers[i].name);
        if(Controller.Controllers[i].name == name){
          return i;
        }
    }
    return -1;
  }

}
