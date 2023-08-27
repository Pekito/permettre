import {faker} from "@faker-js/faker";
import { PermissionDatabaseRepository } from "../../src/application/repositories/PermissionDatabaseRepository"
import { AddPermission, AddPermissionInput } from "../../src/application/usecases/AddPermission"
import { PostgreDatabaseConnection } from "../../src/infra/PostgreDatabaseConnection";
import { GetPermission } from "../../src/application/usecases/GetPermission";
const connection = new PostgreDatabaseConnection();
const permissionRepository = new PermissionDatabaseRepository(connection);
test("Deve adicionar uma permissão", async function() {
    const usecase = new AddPermission(permissionRepository);
    const getUsecase = new GetPermission(permissionRepository);
    const input: AddPermissionInput = {
        name: faker.word.words(3)
    }
    const {permissionId} = await usecase.execute(input);
    const result = await getUsecase.execute({
        permissionId
    });
    expect(result.permissionId).toBeDefined();
    expect(result.name).toBe(input.name);
})
afterAll(() => {
    connection.close();
})