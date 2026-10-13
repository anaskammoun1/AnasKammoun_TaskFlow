export type roleType ='Développeur'|'Designer'|'Chef de projet'|'Testeur';

export interface User{
    id:number;
    name: string;
    email: string;
    role: roleType;
    active: boolean;
}