export interface UserApp{
    id?:string;
    firstName: string;
    lastName: string;
    credentials:Credancial[];
    email:string;
    emailVerified: boolean;
    enabled: boolean;
    username:string;
}

export interface Credancial{
    temporary: boolean;
    type: string;
    value: string;
}

