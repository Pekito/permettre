import { Identifier } from "./Identifier";
import { Mode } from "./Mode";

export class UserPermission {
    private _mode: Mode;
    private _permissionId: Identifier;
    get permissionId() {
        return this._permissionId.value;
    }
    public get mode() {
        return this._mode.value;
    }
    private constructor (permissionId: Identifier, mode: string) {
        this._permissionId = permissionId;
        this._mode = new Mode(mode);
    }
    public static create(permissionId: string, mode: string) {
        const identifier = Identifier.create(permissionId);
        return new UserPermission(identifier, mode);
    }
    public editMode(value: string) {
        this._mode = new Mode(value);
    }
}
