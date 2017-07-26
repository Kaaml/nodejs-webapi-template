import { User } from "./model/user.model";
import { ServiceContext } from "../context/service.context";

export interface Authorize {
    authorize<T>(context:ServiceContext<T>):Promise<User>;
}