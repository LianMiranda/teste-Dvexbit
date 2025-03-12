import supertest from "supertest";
import app from "../src";

export const request = supertest(app);
