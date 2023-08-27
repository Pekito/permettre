import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class EditUserPermission{
    constructor(readonly repository: IUserRepository, readonly permissionsRepository: IPermissionRepository) {}
    async execute(input: EditUserPermissionInput): Promise<EditUserPermissionOutput> {
        const user = await this.repository.get(input.userId);
        for (const permissionInput of input.permissions) {
            const permission = await this.permissionsRepository.get(permissionInput.permissionId);
            if(user.hasUserPermission(permission.id)) {
                const userPermission = user.getPermission(permission.id);
                userPermission.editMode(permissionInput.mode)
                continue;
            }
            user.addPermission(permission.id, permissionInput.mode);
        }
        await this.repository.save(user);
    }

}
export type EditUserPermissionInput = {
    userId: string;
    permissions: {permissionId: string, mode: string}[]
}
export type EditUserPermissionOutput = void;