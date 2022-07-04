"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./../../data-source");
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Teste para metodo POST em /users", () => {
    let connection;
    let testUser = {
        name: "Daniel Kenzie",
        email: "daniel@kenzie.com",
        password: "123456Ab!",
        age: 21,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Tentando criar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser);
        expect(response.status).toEqual(201);
        expect(response.body.id.length).toEqual(36);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toEqual(expect.objectContaining({
            id: response.body.id,
            name: testUser.name,
            email: testUser.email,
            age: testUser.age,
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
        }));
    }));
    test("Tentando criar um usuário com um email ja existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser);
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Tentando criar um usuário sem passar os dados", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send();
        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("error");
    }));
});
