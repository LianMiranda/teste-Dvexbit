import { request } from "../jest.setup";

let userId: string;

export const userTest = {
    email:`usuariotest3${Date.now()}@gmail.com`, 
    password: "1234",
    firstName:"Teste", 
    lastName:"da Silva",  
};

beforeAll(async () => {
    const user = await request.post("/user").send(userTest);
    expect(user.body).toHaveProperty("user");
    userId = user.body.user.id;
});

afterAll(async () => {
    if (userId) await request.delete(`/user/${userId}`);
});

describe("Auth Methods", () => {
    it("Deve permitir que o usuário faça login com sucesso", async () => {
        const response = await request.post("/auth").send({ email: userTest.email, password: userTest.password });

        expect(response.body).toHaveProperty("token");
        expect(response.statusCode).toBe(200);
    });

    it("Deve impedir que o usuário faça login com algum campo vazio", async () => {
        const response = await request.post("/auth").send({ email: "", password: userTest.password });

        expect(response.body.message).toBe("Verifique se os campos foram preenchidos");
        expect(response.statusCode).toBe(422);
    });

    it("Deve impedir que o usuário faça login com senha incorreta", async () =>{
        const response = await request.post("/auth").send({email: userTest.email, password: "000004320"})

        expect(response.body.message).toBe("Credênciais inválidas");
        expect(response.statusCode).toBe(400);
    });

    it("Deve impedir que o usuário faça login com email incorreto (inexistente)", async () => {
        const response = await request.post("/auth").send({ email: `${Date.now()}@gmail.com`, password: userTest.password });
        expect(response.body.message).toBe("Credênciais inválidas");
        expect(response.statusCode).toBe(400);
    });
});