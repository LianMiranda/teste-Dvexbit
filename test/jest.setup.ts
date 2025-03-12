import supertest from "supertest";
import app from "../src";

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
