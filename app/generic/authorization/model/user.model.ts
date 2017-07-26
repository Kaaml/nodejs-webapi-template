export interface User{
    Name?: string;
    Id?:number;
    Role?:string;
    Params?: {[key: string]: any}
}