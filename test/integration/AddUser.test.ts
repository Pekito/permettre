import { faker } from "@faker-js/faker";
import { PermissionDatabaseRepository } from "../../src/application/repositories/PermissionDatabaseRepository";
import { UserDatabaseRepository } from "../../src/application/repositories/UserDatabaseRepository";
import { AddUser, AddUserInput } from "../../src/application/usecases/AddUser";
import { PostgreDatabaseConnection } from "../../src/infra/PostgreDatabaseConnection";
import { GetUser, GetUserInput } from "../../src/application/usecases/GetUser";
import { AddPermission } from "../../src/application/usecases/AddPermission";
import { UserGroupDatabaseRepository } from "../../src/application/repositories/UserGroupDatabaseRepository";
const connection = new PostgreDatabaseConnection();
const userRepo = new UserDatabaseRepository(connection);
const permissionsRepo = new PermissionDatabaseRepository(connection);
const userGroupRepo = new UserGroupDatabaseRepository(connection);

test("Deve criar um usuário pelado", async () => {
    const usecase = new AddUser(userRepo, permissionsRepo, userGroupRepo);
    const getUsecase = new GetUser(userRepo, permissionsRepo);
    const input: AddUserInput = {
        userId: faker.string.uuid()
    }
    const output = await usecase.execute(input);
    const getInput: GetUserInput = {
        userId: output.userId
    }
    const user = await getUsecase.execute(getInput);
    expect(user.userId).toBe(input.userId);
});
test("Deve criar um usuário com permissões definidas", async () => {
    const usecase = new AddUser(userRepo, permissionsRepo, userGroupRepo);
    const getUsecase = new GetUser(userRepo, permissionsRepo);
    const addPermission = new AddPermission(permissionsRepo);
    const addPermissionInput  = {
        name: faker.word.words(3)
    };
    const {permissionId} = await addPermission.execute(addPermissionInput);
    const permissionInput = {
        permissionId,
        mode: "unauthorized"
    };
    const input: AddUserInput = {
        userId: faker.string.uuid(),
        permissions: [
            permissionInput
        ]
    }
    const output = await usecase.execute(input);
    const getInput: GetUserInput = {
        userId: output.userId
    }
    const user = await getUsecase.execute(getInput);
    expect(user.userId).toBe(input.userId);
    expect(user.permissions[0].mode).toBe(permissionInput.mode);
});
afterAll(() => {
    connection.close();
});