import * as express from 'express';
import { Container } from "inversify";
var bodyParser = require('body-parser');
var cors = require('cors');
import "reflect-metadata";
import { RestApiService } from "./services/restapi.service";
import { ServiceContext } from "./context/service.context";
import { AppContext } from "./context/app.context";
import { BasicMiddleware } from "./middlewares/basic.middleware";
import { Dependency } from "./dependency-injection/dependency.model";
import { Controller } from "./controllers/controller";
import { Authorize } from "./authorization/authorize.interface";
export class WebServer {
    private  _restApiService: RestApiService;
    private readonly _container: Container;
    private app: express.Express;
    private _dbContext;
    constructor(){
        this._container = new Container();

    }
    initializeWebServer(port: number, https: boolean = false) {
        this.app = express();
        let server: any;
        if (https) {
            //TODO: Implement https
        } else {
            server = require('http');
        }
        server.createServer(this.app).listen(port);
        console.log("Server is listen on port:", port);
        //this.app.use(express.query());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        
    }
    public registerRestApiService(){
        let instance = this;
        this._container.bind<express.Express>('Express').toDynamicValue((context)=> {return instance.app});
        this._container.bind<RestApiService>('RestApiService').to(RestApiService).inSingletonScope();
        this._restApiService = this._container.get<RestApiService>('RestApiService');
    }

    addCors() {
        this.app.use(cors());
    }
    addMiddelware<T extends BasicMiddleware>(objType: any, symbol: string) {
        this.addServiceSingleton<T>(symbol, objType);
        let middleware =  this._container.get<T>(symbol);
        this.app.use((error, req, res, next) => {
            let context = new AppContext(req, res, next);
            context.Parameters = {
                Error: error
            }
            middleware.initialize(context);
        });
    }
    addServiceTransient<I>(appSymbol:string, objectClass: any){
        this._container.bind<I>(appSymbol).to(objectClass).inTransientScope();
    }
    addServiceSingleton<I>(appSymbol:string, objectClass: any){
        this._container.bind<I>(appSymbol).to(objectClass).inSingletonScope();
    }
    addDBContext<T>(objectClass: any){
        this._container.bind<T>('DB').to(objectClass).inSingletonScope();
        this._dbContext = this._container.get<T>('DB');
    }
    registerAuthorizationService(objectClass: any){
        this.addServiceTransient<Authorize>('Authorize', objectClass);
    }
    registerController<T extends Controller>(appSymbol:string, objectClass: any){
        this.addServiceSingleton<T>(appSymbol, objectClass);
        let controller =  this._container.get<T>(appSymbol);
        controller['_apiService'] = this._restApiService;
        controller.initializeAPI();
    }


}