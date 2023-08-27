import { faker } from "@faker-js/faker";
import { PostgreDatabaseConnection } from "../../src/infra/PostgreDatabaseConnection";
import { PermissionDatabaseRepository } from "../../src/application/repositories/PermissionDatabaseRepository";
import { AddPermission } from "../../src/application/usecases/AddPermission";
import { UserGroupDatabaseRepository } from "../../src/application/repositories/UserGroupDatabaseRepository";
import { AddUserGroup, AddUserGroupInput } from "../../src/application/usecases/AddUserGroup";
import { GetUserGroup } from "../../src/application/usecases/GetUserGroup";

const connection = new PostgreDatabaseConnection();
const repo = new UserGroupDatabaseRepository(connection);
const permissionsRepo = new PermissionDatabaseRepository(connection);
test("Deve criar um user group", async () => {
  const permissionUsecase = new AddPermission(permissionsRepo);
  const usecase = new AddUserGroup(repo);
  const getUsecase = new GetUserGroup(repo);
  const { permissionId } = await permissionUsecase.execute({
    name: faker.word.words(3),
  });
  const userGroupPermission = {
    permissionId,
    mode: "unauthorized",
  };
  const input: AddUserGroupInput = {
    name: faker.word.words(1),
    permissions: [userGroupPermission],
  };;
  const {userGroupId} = await usecase.execute(input);
  const userGroupOutput = await getUsecase.execute({
    userGroupId
  });
  expect(userGroupOutput.userGroupId).toBeDefined();
  expect(userGroupOutput.name).toBe(input.name);
  expect(userGroupOutput.permissions[0].permissionId).toBe(userGroupPermission.permissionId);
  expect(userGroupOutput.permissions[0].mode).toBe(userGroupPermission.mode);
});

afterAll(() => {
  connection.close();
});
