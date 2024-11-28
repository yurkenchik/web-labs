import {User} from "../../user/user.entity";

export interface AuthorizationResponseInterface {
    user: Partial<User>,
    token: string;
}