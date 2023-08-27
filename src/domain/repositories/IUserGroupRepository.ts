import { UserGroup } from "../entities/UserGroup";

export interface IUserGroupRepository {
    get(id: string): Promise<UserGroup>;
    create(userGroup: UserGroup): Promise<void>;
}