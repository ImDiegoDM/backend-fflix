import { Session,ISession } from '../database/session';

 export const Auth = async (request,response,next)=>{
   if ( request.path == '/') return next();
   let header = request.get('authorization');
   let doc = await Session.findOne<ISession>({token:header});
   if(doc==null) response.status(401).send('Something broke!');
   else next();
 }
