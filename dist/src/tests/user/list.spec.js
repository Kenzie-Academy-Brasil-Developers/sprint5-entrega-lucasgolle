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
const data_source_1 = require("../../data-source");
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Teste para metodo DELETE em /users/:id", () => {
    let connection;
    let testUser1 = {
        name: "Daniel Kenzie",
        email: "daniel@kenzie.com",
        password: "123456Ab!",
        age: 21,
    };
    let response1;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        response1 = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser1);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Tentando deletar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseDelete = yield (0, supertest_1.default)(app_1.default).delete(`/users/${response1.body.id}`);
        expect(responseDelete.status).toEqual(200);
        expect(responseDelete.body).toHaveProperty("message");
    }));
    test("Tentando deletar um usuário que não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/users/1`);
        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty("message");
    }));
});
describe("Teste para metodo GET em /users", () => {
    let connection;
    let testUser1 = {
        name: "Daniel Kenzie",
        email: "daniel@kenzie.com",
        password: "123456Ab!",
        age: 21,
    };
    let testUser2 = {
        name: "Ugo Kenzie",
        email: "ugo@kenzie.com",
        password: "123456Ab!",
        age: 18,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser1);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser2);
        delete testUser1.password;
        delete testUser2.password;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Tentando listar todos usuários", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/users");
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(2);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining(Object.assign(Object.assign({}, testUser1), { id: response.body[0].id, created_at: response.body[0].created_at, updated_at: response.body[0].updated_at })),
            expect.objectContaining(Object.assign(Object.assign({}, testUser2), { id: response.body[1].id, created_at: response.body[1].created_at, updated_at: response.body[1].updated_at })),
        ]));
    }));
});
