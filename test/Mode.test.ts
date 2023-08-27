import { Mode } from "../src/domain/value-objects/Mode";

test("Deve dar erro caso um modo inválido seja criado", function() {
    expect(() => new Mode("foo")).toThrowError();
})
test.each(["unauthorized", "read", "write"])("Deve criar um modo", function(mode) {
    expect(() => new Mode(mode)).not.toThrowError();
})