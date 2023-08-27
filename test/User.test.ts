import { User } from "../src/domain/entities/User";
import { UserGroup } from "../src/domain/entities/UserGroup";
import { Identifier } from "../src/domain/value-objects/Identifier";
import { UserPermission } from "../src/domain/value-objects/UserPermission";

test("Deve criar um user", function () {
    expect(() => User.create("")).not.toThrowError();
})

test("Deve adicionar uma permission para um usuário", function() {
    const user = User.create("");
    user.addPermission(Identifier.generate().value, "unauthorized");
    expect(user.permissions.length).toBe(1);
});

test("Deve dar erro ao pegar uma permission que não existe", function() {
    const user = User.create("");
    expect(() => user.getPermission("")).toThrowError();
});

test("Deve adicionar uma permission ao Usuário", function() {
    const user = User.create("");
    const permissionId = Identifier.generate();
    user.addPermission(permissionId.value, "unauthorized");
    const userPermission = user.getPermission(permissionId.value);
    expect(userPermission.mode).toBe("unauthorized");
    expect(userPermission.permissionId).toBe(permissionId.value);
});

test("Deve sobrescrever o valor de uma permission caso o usuário tenha ela definida", function () {
    const permissionId = "79520938-070b-438d-b2a4-f237faf1ae02";
    const userMode = "unauthorized";
    const user = User.create("1");
    user.addPermission(permissionId, userMode);
    const userGroup = UserGroup.create("");
    userGroup.addPermission(permissionId, "read");
    user.addUserGroup(userGroup);
    const mode = user.getPermissionMode(permissionId);
    expect(mode).toBe(userMode);
});

test("Deve retornar o valor de uma permission de user group", function () {
    const permissionId = "79520938-070b-438d-b2a4-f237faf1ae02";
    const user = User.create("1");
    const userGroup = UserGroup.create("");
    userGroup.addPermission(permissionId, "read");
    user.addUserGroup(userGroup);
    const mode = user.getPermissionMode(permissionId);
    expect(mode).toBe("read");
});

test("Deve retornar o maior valor de uma permission entre dois user groups diferentes", function () {
    const permissionId = "79520938-070b-438d-b2a4-f237faf1ae02";
    const user = User.create("1");
    const userGroup = UserGroup.create("");
    const userGroup2 = UserGroup.create("");
    const userGroup3 = UserGroup.create("");
    userGroup.addPermission(permissionId, "read");
    userGroup2.addPermission(permissionId, "write");
    userGroup3.addPermission(permissionId, "unauthorized");
    user.addUserGroup(userGroup);
    user.addUserGroup(userGroup2);
    const mode = user.getPermissionMode(permissionId);
    expect(mode).toBe("write");
});

test("Deve retornar erro caso tente adicionar uma user permission que já foi previamente cadastrada", function() {
    const user = User.create("1");
    user.addPermission("79520938-070b-438d-b2a4-f237faf1ae02", "unauthorized");
    expect(() => user.addPermission("79520938-070b-438d-b2a4-f237faf1ae02", "read")).toThrowError();
}) 