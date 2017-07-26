import { Controller } from "../generic/controllers/controller";
import { ServiceContext } from "../generic/context/service.context";
import { injectable, inject  } from "inversify";

@injectable()
export class ApiVersionController extends Controller  {
    
    initializeAPI(): void {
        this._apiService.initializeGetService<ApiVersionController>('/api',this,this.getApiVersion);
    }
    getApiVersion(context:ServiceContext<ApiVersionController>){
        context.Response.send({API: '1.1.0'});
    }

}