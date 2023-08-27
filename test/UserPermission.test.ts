import { Identifier } from "../src/domain/value-objects/Identifier"
import { UserPermission } from "../src/domain/value-objects/UserPermission";

test("Deve editar uma permission", function() {
    const userPermission = UserPermission.create(Identifier.generate().value, "unauthorized");
    userPermission.editMode("read");
    expect(userPermission.mode).toBe("read");
});