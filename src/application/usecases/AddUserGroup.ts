import { UserGroup } from "../../domain/entities/UserGroup";
import { IUserGroupRepository } from "../../domain/repositories/IUserGroupRepository";

export class AddUserGroup {
    constructor(readonly repository: IUserGroupRepository) {}
    async execute(input: AddUserGroupInput): Promise<AddUserGroupOutput> {
        const userGroup = UserGroup.create(input.name);
        if(input.permissions) {
            for(const permission of input.permissions) {
                userGroup.addPermission(permission.permissionId, permission.mode);
            }
        }
        await this.repository.create(userGroup);
        return {
            userGroupId: userGroup.id
        }
    }

}
export type AddUserGroupInput = {
    name: string;
    permissions?: {permissionId: string, mode: string}[]
}
export type AddUserGroupOutput = {
    userGroupId: string;
};