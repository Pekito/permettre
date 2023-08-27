import { Permission } from "../../domain/entities/Permission";
import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";

export class AddPermission {
    constructor(readonly repository: IPermissionRepository) {}
    async execute(input: AddPermissionInput): Promise<AddPermissionOutput> {
        const permission = Permission.create(input.name);
        await this.repository.save(permission);
        return {
            permissionId: permission.id
        }
    }

}
export type AddPermissionInput = {
    name: string;
}
export type AddPermissionOutput = {
    permissionId: string;
};