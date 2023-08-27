import { User } from "../entities/User";

export interface IUserRepository {
    get(id: string): Promise<User>;
    save(user: User): Promise<void>;
    removeUserPermission(userVirtualId: string, permissionId: string): Promise<void>;
}