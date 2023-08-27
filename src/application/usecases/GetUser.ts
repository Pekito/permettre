import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class GetUser {
    constructor(readonly repository: IUserRepository, readonly permissionsRepository: IPermissionRepository) {}
    async execute(input: GetUserInput): Promise<GetUserOutput> {
        const user = await this.repository.get(input.userId);
        const permissions = await this.permissionsRepository.getAll();
        const userPermissions = permissions
        .map(permission => {
                return {
                    id: permission.id,
                    name: permission.name,
                    mode: user.getPermissionMode(permission.id)
                }
            });
        return {
            userId: user.id,
            permissions: userPermissions
        }
    }

}
export type GetUserInput = {
    userId: string;
}
export type GetUserOutput = {
    userId: string;
    permissions: {id: string, name: string, mode: string}[]
};