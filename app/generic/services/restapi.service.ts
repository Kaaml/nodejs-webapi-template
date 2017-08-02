//import { AuthorizeService } from './authorize.service';
//import {DictionaryUtil} from '../../utils/dictionary.util';
//import { UserModel } from "../../models/user/user.model";
import { Authorize } from "../authorization/authorize.interface";
import { ServiceContext } from "../context/service.context";
import { Express } from 'express';
import { inject, injectable } from "inversify";
@injectable()
export class RestApiService {

    constructor( @inject('Express') private server: Express,
        @inject('Authorize') private authorizeService: Authorize) {

    }
    private initializeService<T>(serviceInstance: T, callback: (context: ServiceContext<T>) => void): (req: any, res: any, next: (arg) => void) => void {
        return (req: any, res: any, next: (arg) => void) => {
            let context = new ServiceContext<T>(req, res, next, serviceInstance);
            this.authenticateUser(context, callback);
        }
    }
    private authenticateUser<T>(context: ServiceContext<T>,
        callback: (context: ServiceContext<T>) => void) {
        this.authorizeService.authorize<T>(context).then(data => {
            if (data) {
                try {
                    context.User = data;
                    callback(context);
                }
                catch (e) {
                    context.next(e);
                }
            }
            else {
                //TODO: implement access denied
                //next()
                //res.status(403).json(DictionaryUtil.AccesDenied());
            }
        }).catch(error => context.next(error));
    }

    public initializePutService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.put(url, this.initializeService<T>(serviceInstance, callback));
    }
    public initializeGetService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.get(url, this.initializeService<T>(serviceInstance, callback));
    }
    public initializePostService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.post(url, this.initializeService<T>(serviceInstance, callback));
    }
    public initializeDeleteService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.delete(url, this.initializeService<T>(serviceInstance, callback));
    }
    public initializePatchService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.patch(url, this.initializeService<T>(serviceInstance, callback));
    }
    public initializeHeadService<T>(url: string, serviceInstance: T, callback: (context: ServiceContext<T>) => void) {
        this.server.head(url, this.initializeService<T>(serviceInstance, callback));
    }
}