export interface UserRes{
    success: boolean,
    msg: string,
    user?: User,
    jwt?: string
}

export interface User{
    admin: boolean,
    email: string,
    firstname: string,
    lastname: string,
    username: string
}