const request = require("supertest");
const express = require("express");
const routes = require("../routes/custumeres.routes");

const app = express();
app.use(express.json());
app.use(routes);

describe("Testando API de Customers", () => {
  it("Deve retornar uma lista de clientes", async () => {
    const res = await request(app).get("/customers");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve retornar um cliente específico", async () => {
    const res = await request(app).get("/customers/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });
});
