export class Mode {
    private _value: ModeType;
    public get value() {
        return this._value;
    }
    constructor(input: string) {
        if(!this.isValid(input)) throw new Error("Mode: Invalid value");
        this._value = input;
    }
    private isValid(input: string): input is ModeType {
        return input === "unauthorized" || input === "read" || input === "write";
    }
}

export type ModeType = "unauthorized" | "read" | "write";