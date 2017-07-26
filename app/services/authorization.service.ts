import {Authorize} from '../generic/authorization/authorize.interface';
import { ServiceContext } from "../generic/context/service.context";
import { User } from "../generic/authorization/model/user.model";
import { injectable } from "inversify";
@injectable()
export class AuthorizationService implements Authorize {
    authorize<T>(context: ServiceContext<T>): Promise<User> {
       return new Promise<User>( (resolve, reject)=>{
           //TODO: authorization method here
           resolve({ Name: 'Hello word'});
       })
    }

}