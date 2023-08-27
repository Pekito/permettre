import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class RemoveUserPermission {
    constructor(readonly repository: IUserRepository) {}
    async execute(input: RemoveUserPermissionInput): Promise<RemoveUserPermissionOutput> {
        const user = await this.repository.get(input.userId);
        const permission = user.getPermission(input.permissionId);
        await this.repository.removeUserPermission(user.virtualId, permission.permissionId);
    }

}
export type RemoveUserPermissionInput = {
    userId: string;
    permissionId: string;
}
export type RemoveUserPermissionOutput = void;