import { Request, Response } from 'express'
export class AppContext {
    constructor(request: Request, response: Response, next: (arg) => void) {
        this.Request = request;
        this.Response = response;
        this.next = next;
    }
    Request: Request;
    Response: Response;
    next: (arg) => void;
    Parameters: { [key: string]: any };
}