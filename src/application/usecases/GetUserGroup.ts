import { IUserGroupRepository } from "../../domain/repositories/IUserGroupRepository";

export class GetUserGroup {
    constructor(readonly repository: IUserGroupRepository) {}
    async execute(input: GetUserGroupInput): Promise<GetUserGroupOutput> {
        const group = await this.repository.get(input.userGroupId);
        const permissions = group.permissions.map(permission => {
            return {
                permissionId: permission.permissionId,
                mode: permission.mode,
            }
        });
        return {
            userGroupId: group.id,
            name: group.name,
            permissions
        }
    }

}
export type GetUserGroupInput = {
    userGroupId: string;
}
export type GetUserGroupOutput = {
    userGroupId: string;
    name: string;
    permissions: {permissionId: string, mode: string}[]
};