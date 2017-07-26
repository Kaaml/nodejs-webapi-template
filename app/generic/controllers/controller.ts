import { RestApiService } from "../services/restapi.service";
import { injectable, inject  } from "inversify";
@injectable()
export abstract class Controller {
    constructor(@inject('RestApiService') apiService: RestApiService){
        this._apiService = apiService;
    }
    protected _apiService: RestApiService;
    private _dbContext: any;
    protected dbContext<T>() : T {
        return (this._dbContext as T)
    }
    abstract initializeAPI():void;
}