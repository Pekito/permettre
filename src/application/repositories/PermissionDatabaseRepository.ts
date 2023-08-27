import { Permission } from "../../domain/entities/Permission";
import { IPermissionRepository } from "../../domain/repositories/IPermissionRepository";
import { IDatabaseConnection } from "../../infra/IDatabaseConnection";

export class PermissionDatabaseRepository implements IPermissionRepository{
    private readonly _connection: IDatabaseConnection;
    constructor(connection: IDatabaseConnection) {
        this._connection = connection;
    }
    async getAll(): Promise<Permission[]> {
        const statement = 
            `
                SELECT
                    *
                FROM
                    permissions;
            `
        const permissionsData = await this._connection.query(statement);
        const permissions = [];
        for(const permissionData of permissionsData) {
            permissions.push(Permission.restore(
                permissionData.permission_id,
                permissionData.name
            ))
        };
        return permissions;
        ;
    }
    async get(id: string): Promise<Permission> {
        const statement = 
            `
                SELECT
                    *
                FROM
                    permissions
                WHERE
                    permission_id = $1;
            `
        ;
        const [permissionData] = await this._connection.query(statement, [id]);
        const permission = Permission.restore(permissionData.permission_id, permissionData.name);
        return permission;
    }
    async save(permission: Permission): Promise<void> {
        const statement = 
            `
                INSERT INTO
                    permissions (permission_id, name)
                VALUES
                    ($1, $2);
            `
        ;
        await this._connection.query(statement, [permission.id, permission.name]);
    }
    async edit(permission: Permission): Promise<void> {
        const statement = 
            `
                UPDATE
                    permissions
                SET
                    name = $1
                WHERE
                    permission_id = $2;
            `
        ;
        await this._connection.query(statement, [permission.name, permission.id]);
    }

}