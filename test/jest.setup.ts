import supertest from "supertest";
import app from "../src";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const request = supertest(app);

let userId: string;
let token: string;


export const userTest = {
  email: `usuarioteste${Date.now()}@gmail.com`,
  password: "1234",
  firstName: "Teste",
  lastName: "da Silva",
};

beforeAll(async () => {  
  const userResponse = await request.post("/user").send(userTest);
  userId = userResponse.body.user.id;

  let tries = 2;
  while (tries > 0) {
    const userInDb = await request.get(`/user/${userId}`).send(userTest);
    if (userInDb) break;
    tries--;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }


  const loginResponse = await request.post("/auth").send({
    email: userTest.email,
    password: userTest.password,
  });

  token = loginResponse.body.token;

  global.token = token;
  global.userId = userId;
  global.email = userTest.email;
  global.password = userTest.password;
});

afterAll(async () => {  
  if (userId) {
    await request.delete(`/user/${userId}`).set("Authorization", `Bearer ${global.token}`);
  }
});
