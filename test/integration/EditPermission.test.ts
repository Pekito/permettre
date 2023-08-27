import {faker} from "@faker-js/faker";
import { PermissionDatabaseRepository } from "../../src/application/repositories/PermissionDatabaseRepository"
import { AddPermission, AddPermissionInput } from "../../src/application/usecases/AddPermission"
import { PostgreDatabaseConnection } from "../../src/infra/PostgreDatabaseConnection";
import { GetPermission } from "../../src/application/usecases/GetPermission";
import { EditPermission, EditPermissionInput } from "../../src/application/usecases/EditPermission";
const connection = new PostgreDatabaseConnection();
const permissionRepository = new PermissionDatabaseRepository(connection);
test("Deve editar uma permissão", async function() {
    const usecase = new AddPermission(permissionRepository);
    const getUsecase = new GetPermission(permissionRepository);
    const editUsecase = new EditPermission(permissionRepository);
    const addInput: AddPermissionInput = {
        name: faker.word.words(3)
    }
    const {permissionId} = await usecase.execute(addInput);
    const editInput: EditPermissionInput = {
        permissionId,
        name: faker.word.words(3)
    }
    await editUsecase.execute(editInput);
    const result = await getUsecase.execute({
        permissionId
    });
    expect(result.permissionId).toBeDefined();
    expect(result.name).toBe(editInput.name);
})
afterAll(() => {
    connection.close();
})