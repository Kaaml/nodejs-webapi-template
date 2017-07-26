
import { WebServer } from "./generic/server";
import { ApiVersionController } from "./controllers/api-version.controller";
import { AuthorizationService } from "./services/authorization.service";

export class Init {
    _webServer:WebServer;
    configureService(){
      //  this._webServer.addServiceTransient<Init>(this);
    }
    configureServer(){
        this._webServer = new WebServer();
        this._webServer.initializeWebServer(5000,false);
        //Initialize dbContext

        //Initialize authorizeService
        this._webServer.registerAuthorizationService(AuthorizationService);
        //Initialize rest api service
        this._webServer.registerRestApiService();
        //Initialize controllers
        this._webServer.registerController<ApiVersionController>('ApiVersionController',ApiVersionController);
    }
}