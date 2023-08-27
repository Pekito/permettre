import { Permission } from "../../domain/entities/Permission";
import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";

export class GetPermission {
    constructor(readonly repository: IPermissionRepository) {}
    async execute(input: GetPermissionInput): Promise<GetPermissionOutput> {
        const permission = await this.repository.get(input.permissionId);
        return {
            permissionId: permission.id,
            name: permission.name
        }
    }

}
export type GetPermissionInput = {
    permissionId: string;
}
export type GetPermissionOutput = {
    permissionId: string;
    name: string;
};