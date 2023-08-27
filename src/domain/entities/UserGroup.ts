import { Identifier } from "../value-objects/Identifier"
import { UserPermission } from "../value-objects/UserPermission";

export class UserGroup {
    private _id: Identifier;
    private _permissions: UserPermission[] = [];
    private _name: string;
    public get id() {
        return this._id.value;
    }
    public get permissions() {
        return this._permissions;
    }
    public get name() {
        return this._name;
    }
    private constructor(id: Identifier, name: string) {
        this._id = id;
        this._name = name;
    }
    public hasPermission(permissionId: string) {
        const permission = this._permissions.find(permission => permission.permissionId === permissionId);
        return !!permission;
    }
    public getPermission(permissionId: string) {
        const permission = this._permissions.find(permission => permission.permissionId === permissionId)
        if(!permission) throw new Error("UserGroup: Permission not found");
        return permission;
    }
    public addPermission(permissionId: string, mode: string) {
        const userPermission = UserPermission.create(permissionId, mode);
        this._permissions.push(userPermission);
    }
    public static create(name: string) {
        const id = Identifier.generate();
        return new UserGroup(id, name);
    }
    public static restore(id: string, name: string) {
        const identifier = Identifier.create(id);
        return new UserGroup(identifier, name);
    }
}