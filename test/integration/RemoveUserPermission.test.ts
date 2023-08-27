import { faker } from "@faker-js/faker";
import { PermissionDatabaseRepository } from "../../src/application/repositories/PermissionDatabaseRepository";
import { UserDatabaseRepository } from "../../src/application/repositories/UserDatabaseRepository";
import { AddUser, AddUserInput } from "../../src/application/usecases/AddUser";
import { PostgreDatabaseConnection } from "../../src/infra/PostgreDatabaseConnection";
import { GetUser, GetUserInput } from "../../src/application/usecases/GetUser";
import { AddPermission } from "../../src/application/usecases/AddPermission";
import { RemoveUserPermission } from "../../src/application/usecases/RemoveUserPermission";
import { UserGroupDatabaseRepository } from "../../src/application/repositories/UserGroupDatabaseRepository";
import { AddUserGroup, AddUserGroupInput } from "../../src/application/usecases/AddUserGroup";
const connection = new PostgreDatabaseConnection();
const userRepo = new UserDatabaseRepository(connection);
const permissionsRepo = new PermissionDatabaseRepository(connection);
const userGroupRepo = new UserGroupDatabaseRepository(connection);

test("Deve remover uma permissão de usuário e voltar para o valor padrão unauthorized", async () => {
    const addUserUsecase = new AddUser(userRepo, permissionsRepo, userGroupRepo);
    const getUserUsecase = new GetUser(userRepo, permissionsRepo);
    const addPermissionUsecase = new AddPermission(permissionsRepo);
    const addPermissionInput  = {
        name: faker.word.words(3)
    };
    const {permissionId} = await addPermissionUsecase.execute(addPermissionInput);
    const permissionInput = {
        permissionId,
        mode: "read"
    };
    const addUserInput: AddUserInput = {
        userId: faker.string.uuid(),
        permissions: [
            permissionInput
        ]
    }
    const addUserOutput = await addUserUsecase.execute(addUserInput);
    const removeUserUsecase = new RemoveUserPermission(userRepo);
    await removeUserUsecase.execute({
        userId: addUserOutput.userId,
        permissionId: permissionId
    })
    const getUserInput: GetUserInput = {
        userId: addUserOutput.userId
    };
    const getUserOutput = await getUserUsecase.execute(getUserInput);
    const removedPermission = await getUserOutput.permissions.find(_ => _.id === permissionId);
    expect(getUserOutput.userId).toBe(addUserInput.userId);
    expect(removedPermission?.mode).toBe("unauthorized");
});

test("Deve remover uma permissão de usuário e voltar para o valor do user group", async () => {
    const addUserUsecase = new AddUser(userRepo, permissionsRepo,userGroupRepo);
    const getUserUsecase = new GetUser(userRepo, permissionsRepo);
    const addPermissionUsecase = new AddPermission(permissionsRepo);
    const addPermissionInput  = {
        name: faker.word.words(3)
    };
    const {permissionId} = await addPermissionUsecase.execute(addPermissionInput);
    const permissionInput = {
        permissionId,
        mode: "read"
    };
    const addUserGroupInput: AddUserGroupInput = {
        name: faker.word.words(3),
        permissions: [{permissionId, mode: "write"}]
    }
    const { userGroupId } = await new AddUserGroup(userGroupRepo).execute(addUserGroupInput);
    const addUserInput: AddUserInput = {
        userId: faker.string.uuid(),
        permissions: [
            permissionInput
        ],
        userGroups: [userGroupId],
    }
    const addUserOutput = await addUserUsecase.execute(addUserInput);
    const removeUserUsecase = new RemoveUserPermission(userRepo);
    await removeUserUsecase.execute({
        userId: addUserOutput.userId,
        permissionId: permissionId
    })
    const getUserInput: GetUserInput = {
        userId: addUserOutput.userId
    };
    const getUserOutput = await getUserUsecase.execute(getUserInput);
    const removedPermission = getUserOutput.permissions.find(_ => _.id === permissionId);
    expect(getUserOutput.userId).toBe(addUserInput.userId);
    expect(removedPermission?.mode).toBe("write");
});
afterAll(() => {
    connection.close();
});