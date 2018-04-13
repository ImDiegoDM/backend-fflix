/*
 Base class for Routes
*/
import {Controller} from '../controllers/Controller';
import {middlewares} from '../middlewares/middlewares';
import * as multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

export class Routes{
  group:string;
  cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'sample', maxCount: 1 }]);

  constructor(protected server:any){}

  public mountRoutes(){
  }

  public get(endpoint:string,handler:string,middleware?:string){
    if(middleware) this.server.get(this.group+endpoint,middlewares[middleware],this.getHandler(handler));
    else this.server.get(this.group+endpoint,this.getHandler(handler));
  }

  public post(endpoint:string,handler:string,middleware?:string){
    if(middleware) this.server.post(this.group+endpoint,this.cpUpload,middlewares[middleware],this.getHandler(handler));
    else this.server.post(this.group+endpoint,this.cpUpload,this.getHandler(handler));
  }

  public postFile(){

  }

   /**
    Get controller function from string
    ex: MainController@index return the index function from MainController
    */
  public getHandler(handler:string):Promise<any>{
    let splited = handler.split('@');
    let controllerName = splited[0];
    let funcName = splited[1];
    const  controller = new Controller.Controllers[this.getControllerIndex(controllerName)]();
    return controller[funcName];
  }

  public getControllerIndex(name:string):number{
    for (let i = 0; i < Controller.Controllers.length; i++) {
        if(Controller.Controllers[i].name == name){
          return i;
        }
    }
    return -1;
  }

}
