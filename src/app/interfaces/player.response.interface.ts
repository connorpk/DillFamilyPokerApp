import { User } from './user.response.interface';

export interface PlayerRes{
    success: boolean,
    msg: string,
    players: Array<User>
}