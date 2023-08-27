import { UserGroup } from "../../domain/entities/UserGroup";
import { IUserGroupRepository } from "../../domain/repositories/IUserGroupRepository";
import { IDatabaseConnection } from "../../infra/IDatabaseConnection";

export class UserGroupDatabaseRepository implements IUserGroupRepository {
  private readonly _connection: IDatabaseConnection;
  constructor(connection: IDatabaseConnection) {
    this._connection = connection;
  }
  async get(id: string): Promise<UserGroup> {
    const selectByIdStatement = `
        SELECT * FROM user_groups WHERE id = $1;
        `;
    const selectPermissionsByUserGroupStatement = `
        SELECT * FROM user_group_permissions WHERE user_group_id = $1;
      `;
    const [userGroupData] = await this._connection.query(selectByIdStatement, [
      id,
    ]);
    const permissionsData = await this._connection.query(selectPermissionsByUserGroupStatement, [id]);
    const userGroup = UserGroup.restore(userGroupData.id, userGroupData.name);
    for(const permissionData of permissionsData) {
      userGroup.addPermission(permissionData.permission_id, permissionData.mode);
    }
    return userGroup;
  }
  async create(userGroup: UserGroup): Promise<void> {
    const insertStatement = `
            INSERT INTO user_groups (id, name)
            VALUES ($1, $2);
            `;
    const insertPermissionStatement = `
      INSERT INTO user_group_permissions (user_group_id, permission_id, mode)
      VALUES ($1, $2, $3);
      `;
    await this._connection.query(insertStatement, [
      userGroup.id,
      userGroup.name,
    ]);
    for (const userPermission of userGroup.permissions) {
      await this._connection.query(insertPermissionStatement, [
        userGroup.id,
        userPermission.permissionId,
        userPermission.mode,
      ]);
    }
  }
}
