    import { request } from "../jest.setup";
    let token: string;
    let userId: string;

    const userTest = {
    email: `teste${Date.now()}@gmail.com`,
    password: "1234",
    firstName: "Teste",
    lastName: "da Silva",
    };

    beforeAll(async () => {
        const user = await request.post("/user").send(userTest);
        expect(user.body).toHaveProperty("user");

        const auth = await request.post("/auth").send({
            email: userTest.email,
            password:userTest.password,
        });
        
        token = auth.body.token;
    })

    afterAll(async () => {
    if (userId) await request.delete(`/user/${userId}`).set("Authorization", `Bearer ${token}`);
    });


    describe("User Methods", () => {
    it("Cria o registro de um usuário", async () => {
        const response = await request.post("/user").send({
            email: `usuarioteste${Date.now()}@gmail.com`,
            password: "1234",
            firstName: "Teste",
            lastName: "da Silva"
        });

        expect(response.body.message).toBe("Usuário criado com sucesso");
        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("user");
        userId = response.body.user.id;
    });

    it("Impede a criação de um usuário com campos vazios", async () => {
        const response = await request.post("/user").send({
        email: " ",
        password: "1234",
        firstName: "Teste",
        lastName: "da Silva",
        });

        expect(response.body.message).toBe("Verifique se os campos foram preenchidos corretamente");
        expect(response.statusCode).toBe(400);
    });

    it("Deve fazer o get de um usuário específico", async () => {
        const response = await request.get(`/user/${userId}`).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });

    it("Deve fazer o update de um usuário específico", async () => {
        const response = await request
        .put(`/user/${userId}`)
        .send({ email: "testando@gmail.com" })
        .set("Authorization", `Bearer ${token}`);
        expect(response.body.message).toBe("Usuário atualizado com sucesso!");
        expect(response.statusCode).toBe(200);
    });

    it("Deve impedir o update de um usuário específico com nenhum campo preenchido", async () => {
        const response = await request
        .put(`/user/${userId}`)
        .send({
            email: "",
            password: "",
            actualPassword: "",
            firstName: " ",
            lastName: " ",
        })
        .set("Authorization", `Bearer ${token}`);
        expect(response.body.message).toBe("Informe ao menos um valor para atualizar");
        expect(response.statusCode).toBe(400);
    });

    it("Deleta um usuário", async () => {
        const response = await request.delete(`/user/${userId}`).set("Authorization", `Bearer ${token}`);
        expect(response.body.message).toBe(`Usuário com o id ${userId} deletado com sucesso!`);
        expect(response.statusCode).toBe(200);
    });
    });
