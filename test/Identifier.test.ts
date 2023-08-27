import { v4 } from "uuid"
import { Identifier } from "../src/domain/value-objects/Identifier";

 test("Deve restaurar um identificador a partir de um uuid válido", function () {
    const uuid = v4();
    const identifier = Identifier.create(uuid);
    expect(identifier.value).toBe(uuid);
 });
 test("Deve dar erro ao tentar restaurar um uuid inválido", function () {
   expect(() => Identifier.create("")).toThrowError();
});