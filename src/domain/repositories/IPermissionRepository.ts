import { Permission } from "../entities/Permission";

export interface IPermissionRepository {
    getAll(): Promise<Permission[]>;
    get(id: string): Promise<Permission>;
    save(permission: Permission): Promise<void>;
    edit(permission: Permission): Promise<void>;
}