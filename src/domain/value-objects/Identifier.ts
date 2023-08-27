import { v4, validate as uuidValidate } from "uuid";
export class Identifier {
    private _value: string;
    get value() {
        return this._value;
    }
    private constructor(uuid: string) {
        this._value = uuid;
    }
    static generate() {
        return new Identifier(v4());
    }
    static create(uuid: string) {
        if(!uuidValidate(uuid)) throw new Error("Identifier: Invalid uuid");
        return new Identifier(uuid);
    }
}