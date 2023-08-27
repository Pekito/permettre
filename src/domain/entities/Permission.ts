import { Identifier } from "../value-objects/Identifier";

export class Permission {
    private _id: Identifier;
    private _name: string;
    public get id() {
        return this._id.value;
    }
    public get name() {
        return this._name;
    }
    private constructor(id: Identifier, name: string) {
        this._id = id;
        this._name = name;
    }
    public static create(name: string) {
        if(!name) throw new Error("Permission: name must be provided");
        const identifier = Identifier.generate();
        return new Permission(identifier, name);
    }
    public static restore(id: string, name: string) {
        const identifier = Identifier.create(id);
        return new Permission(identifier, name);
    }
    public edit({name}:  {name: string}) {
        if(name) this._name = name;
    }
}
