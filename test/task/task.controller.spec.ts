import { request } from "../jest.setup"
import { userTest } from "../user/user.controller.spec"

let userId: string;

const taskTest = {
    titulo: "Estudar programação",
    descricao: "Java",
    dataDaAtividade: "2025-03-22",
}

beforeEach(async () =>{
    const user = await request.post("/user").send(userTest);

    userId = user.body.user.id;
})


afterAll(async () => {

})

describe("Task Methods", () =>{

    it("Cria o registro de uma tarefa", async () => {
        const response = await request.post("/task").send({
            titulo: "Estudar programação",
            descricao: "Java",
            dataDaAtividade: "2025-03-22",
            userId: userId
        });
       
        expect(response.body.message).toBe("Usuário criado com sucesso")
        expect(response.statusCode).toBe(200);
        
        userId = response.body.user.id;        
    });

    it("Impede a criação de um usuário com campos vazios", async () => {
        const response = await request.post("/user").send({
            email:" ", 
            password: "1234",
            firstName:"Teste", 
            lastName:"da Silva",  
        });
        
        expect(response.body.message).toBe("Verifique se os campos foram preenchidos corretamente")
        expect(response.statusCode).toBe(400);       
    });

    it("Deve fazer o get de um usuário especifico", async () => {
        const response = await request.get(`/user/${userId}`);
        expect(response.statusCode).toBe(200);       
     })

    it("Deve fazer o update de um usuário especifico", async () => {
        const response = await request.put(`/user/${userId}`).send({email: "testando@gmail.com",});
        expect(response.body.message).toBe("Usuário atualizado com sucesso!")
        expect(response.statusCode).toBe(200);       
     })

    it("Deve impedir o update de um usuário específico com nenhum campo preenchido", async () => {
        const response = await request.put(`/user/${userId}`).send({
            email: "",
            password: "",
            actualPassword: "",
            firstName: " ",
            lastName: " "
        });
        expect(response.body.message).toBe("Informe ao menos um valor para atualizar")
        expect(response.statusCode).toBe(400);       
     })

     it("Deleta um usuário", async () => {
        const response = await request.delete(`/user/${userId}`);

        expect(response.body.message).toBe(`Usuário com o id ${userId} deletado com sucesso!`)
        expect(response.statusCode).toBe(200);       
     })
})