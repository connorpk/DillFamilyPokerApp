import { User } from './user.response.interface';

export interface StoredUser{
    user: User,
    jwt: String
}