import { request } from "../jest.setup"

let userId: string;
let taskId: string;

export const userTest = {
    email:"usuarioteste2@gmail.com", 
    password: "1234",
    firstName:"Teste", 
    lastName:"da Silva",  
}

beforeAll(async () =>{
    const user = await request.post("/user").send(userTest);
    userId = user.body.user.id;
})


afterAll(async () => {
    if (taskId) await request.delete(`/task/${taskId}`);
    if (userId) await request.delete(`/user/${userId}`);
})

describe("Task Methods", () =>{    
    it("Cria o registro de uma tarefa", async () => {
        
        const response = await request.post("/task").send({
            titulo: "Estudar programação",
            descricao: "Java",
            dataDaAtividade: "2025-03-22",
            userId: userId
        });
    
        expect(response.body.message).toBe("Tarefa criada com sucesso");
        expect(response.statusCode).toBe(201);
        
        taskId = response.body?.task?.id;  
    });
    

     it("Impede a criação de uma tarefa com campo obrigatório titulo vazio", async () => {
        const response = await request.post("/task").send({
            titulo: " ",
            descricao: "Java",
            dataDaAtividade: "2025-03-22",
            userId: userId
        });
        
         expect(response.body.message).toBe("Verifique se o campo titulo foi preenchido corretamente")
         expect(response.statusCode).toBe(400);       
     });

      it("Impede a criação de uma tarefa com o campo obrigatório userId vazio", async () => {
         const response = await request.post("/task").send({
             titulo: "Estudar programação",
             descricao: "Java",
             dataDaAtividade: "2025-03-22",
             userId: ""
         });
        
          expect(response.body.message).toBe("Verifique se o campo userId foi preenchido corretamente")
          expect(response.statusCode).toBe(400);       
      });

      it("Impede a criação de uma tarefa com o campo obrigatório dataDaAtividade vazio", async () => {
         const response = await request.post("/task").send({
             titulo: "Estudar programação",
             descricao: "Java",
             dataDaAtividade: "",
             userId: userId
         });
        
          expect(response.body.message).toBe("Verifique se o campo dataDaAtividade foi preenchido corretamente")
          expect(response.statusCode).toBe(400);       
      });


    it("Deve fazer o get de uma tarefa especifica", async () => {        
        const response = await request.get(`/task/${taskId}`);
        expect(response.statusCode).toBe(200);       
    });

        
    it("Deve fazer o update de uma tarefa especifica", async () => {
        const response = await request.put(`/task/${taskId}`).send({titulo: "Esturando matemática",});
        expect(response.body.message).toBe("Tarefa atualizada com sucesso!")
        expect(response.statusCode).toBe(200);       
        })

    it("Deve impedir o update de um usuário específico com nenhum campo preenchido", async () => {
        const response = await request.put(`/user/${userId}`).send({
            email:"", 
            password: "",
            firstName:"", 
            lastName:"",  
        });
        expect(response.body.message).toBe("Informe ao menos um valor para atualizar")
        expect(response.statusCode).toBe(400);       
        })

        it("Deleta uma tarefa", async () => {
        const response = await request.delete(`/task/${taskId}`);

        expect(response.body.message).toBe(`Tarefa com o id ${taskId} deletada com sucesso!`)
        expect(response.statusCode).toBe(200);       
        })

})