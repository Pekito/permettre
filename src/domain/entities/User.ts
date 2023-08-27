import { Identifier } from "../value-objects/Identifier";
import { UserPermission } from "../value-objects/UserPermission";
import { UserGroup } from "./UserGroup";


export class User {
    private _virtualId: Identifier;
    private _permissions: UserPermission[] = [];
    private _userGroups: UserGroup[] = [];
    
    private constructor(readonly id: string, virtualId: Identifier) {
        this._virtualId = virtualId;
    }

    public get permissions() {
        return this._permissions;
    }
    public get virtualId() {
        return this._virtualId.value;
    }
    public get userGroups() {
        return this._userGroups;
    }
    public addPermission(permissionId: string, mode: string) {
        if(this.hasUserPermission(permissionId)) throw new Error("User: Permission Already exists");
        this._permissions.push(UserPermission.create(permissionId, mode));
    }
    public static create(id: string) {
        const virtualId = Identifier.generate();
        return new User(id, virtualId);
    }
    public static restore(id: string, virtualId: string) {
        const identifier = Identifier.create(virtualId);
        return new User(id, identifier);
    }
    public getPermission(permissionId: string) {
        if(!this.hasUserPermission(permissionId)) throw new Error("User: Permission not found");
        const permission = this._permissions.find(permission => permission.permissionId === permissionId) as UserPermission;
        return permission;
    }
    public getPermissionMode(permissionId: string) {
        if(this.hasUserPermission(permissionId)) return this.getPermission(permissionId).mode;
        let value = "unauthorized";
        for(const userGroup of this._userGroups) {
            if(!userGroup.hasPermission(permissionId)) continue;
            let mode = userGroup.getPermission(permissionId).mode;
            if(value === "unauthorized" && mode !== "unauthorized") value = mode;
            if(value === "read" && mode === "write") value = mode;
        }
        return value;
    }
    public addUserGroup(userGroup: UserGroup) {
        this._userGroups.push(userGroup);
    }
    public hasUserPermission(permissionId: string) {
        const permission = this._permissions.find(permission => permission.permissionId === permissionId);
        return !!permission;
    }
    
}