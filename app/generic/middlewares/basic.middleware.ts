import { AppContext } from "../context/app.context";

export interface BasicMiddleware {
    initialize(context:AppContext);
}