import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";

export class EditPermission {
    constructor(readonly repository: IPermissionRepository) {}
    async execute(input: EditPermissionInput): Promise<EditPermissionOutput> {
        const permission = await this.repository.get(input.permissionId);
        permission.edit({name: input.name});
        await this.repository.edit(permission);
    }

}
export type EditPermissionInput = {
    permissionId: string;
    name: string;
}
export type EditPermissionOutput = void;