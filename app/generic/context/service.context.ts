import { User } from "../authorization/model/user.model";
import { AppContext } from "./app.context";
import { Request, Response } from 'express'

export class ServiceContext<T> extends AppContext {
    constructor(request: Request, response: Response, next: (arg)=>void, serviceInstance: T){
        super(request , response, next);
        this.ServiceInstance = serviceInstance;
    }
    User: User;
    ServiceInstance: T;
   
}