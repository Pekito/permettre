import { User } from "../../domain/entities/User";
import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";
import { IUserGroupRepository } from "../../domain/repositories/IUserGroupRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class AddUser{
    constructor(readonly repository: IUserRepository, readonly permissionsRepository: IPermissionRepository, readonly userGroupRepository: IUserGroupRepository) {}
    async execute(input: AddUserInput): Promise<AddUserOutput> {
        const user = User.create(input.userId);
        if(input.permissions) {
            for(const permission of input.permissions) {
                const exists = await this.permissionsRepository.get(permission.permissionId);
                user.addPermission(exists.id, permission.mode);
            }
        }
        if(input.userGroups) {
            for(const userGroupId of input.userGroups) {
                const userGroup = await this.userGroupRepository.get(userGroupId);
                user.addUserGroup(userGroup);
            }
        }
        await this.repository.save(user);
        return {
            userId: user.id,
            userVirtualId: user.virtualId
        }
    }

}
export type AddUserInput = {
    userId: string;
    permissions?: {permissionId: string, mode: string}[];
    userGroups?: string[]

}
export type AddUserOutput = {
    userId: string;
    userVirtualId: string;
};