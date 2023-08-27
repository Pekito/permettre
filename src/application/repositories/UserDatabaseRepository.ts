import { User } from "../../domain/entities/User";
import { UserGroup } from "../../domain/entities/UserGroup";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IDatabaseConnection } from "../../infra/IDatabaseConnection";

export class UserDatabaseRepository implements IUserRepository{
    private readonly _connection: IDatabaseConnection;
    constructor(connection: IDatabaseConnection) {
        this._connection = connection;
    }
    async get(id: string): Promise<User> {
        const userStatement = 
            `
                SELECT
                    *
                FROM
                    users
                WHERE
                    id = $1;
            `;
        ;
        const userPermissionsStatement = 
            `
                SELECT
                    *
                FROM
                    user_permissions
                WHERE
                    user_virtual_id = $1;
            `
            ;
        const userGroupsStatement = 
            `
            SELECT 
                ug.id AS user_group_id, 
                p.permission_id, 
                p.name AS permission_name, 
                ugp.mode
            FROM 
                user_user_groups uug
            JOIN user_groups ug ON uug.user_group_id = ug.id
            JOIN user_group_permissions ugp ON ug.id = ugp.user_group_id
            JOIN permissions p ON ugp.permission_id = p.permission_id
            WHERE uug.user_virtual_id = $1;
            `;
        const [userData] = await this._connection.query(userStatement, [id]);
        const userPermissionsData = await this._connection.query(userPermissionsStatement, [userData.virtual_id]);
        console.log("User Permissions", userPermissionsData);
        const userGroupsData = await this._connection.query(userGroupsStatement, [userData.virtual_id]);
        const user = User.restore(userData.id, userData.virtual_id);
        for (const userPermissionData of userPermissionsData) {
            user.addPermission(userPermissionData.permission_id, userPermissionData.mode);
        }
        const userGroups: UserGroup[] = [];
        for (const row of userGroupsData) {
            const userGroup = userGroups.find(ug => ug.id === row.user_group_id);
            if(!userGroup) {
                const newGroup = UserGroup.restore(row.user_group_id, row.user_group_name);
                newGroup.addPermission(row.permission_id, row.mode);
                userGroups.push(newGroup);
            }
            else {
                userGroup.addPermission(row.permission_id, row.mode);
            }
        }
        userGroups.forEach(_ => user.addUserGroup(_));
        return user;
    }
    async save(user: User): Promise<void> {
        const userStatement = 
            `
                INSERT INTO
                    users (id, virtual_id)
                VALUES
                    ($1, $2);
            `
        ;
        const userPermissionsStatement = `
            INSERT INTO
                user_permissions (user_virtual_id, permission_id, mode)
            VALUES 
                ($1, $2, $3);
        `;
        const userGroupsStatement = 
            `
                INSERT INTO
                    user_user_groups (user_virtual_id, user_group_id)
                VALUES
                    ($1, $2);
            `;
        await this._connection.query(userStatement, [user.id, user.virtualId]);
        for(const userPermission of user.permissions) {
            await this._connection.query(userPermissionsStatement, [user.virtualId, userPermission.permissionId, userPermission.mode])
        };
        for (const userGroup of user.userGroups) {
            await this._connection.query(userGroupsStatement, [user.virtualId, userGroup.id]);
        }
    };
    async removeUserPermission(userVirtualId: string, permissionId: string): Promise<void> {
       const statement = 
       `
        DELETE FROM
            user_permissions
        WHERE
            user_virtual_id = $1 AND
            permission_id = $2
       `
       ;
       await this._connection.query(statement, [userVirtualId, permissionId]); 
    }
}