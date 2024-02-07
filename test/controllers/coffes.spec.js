import request from "supertest";
import app from "../../server.js";
import { faker } from "@faker-js/faker";
import { creatingCoffee } from "../../src/api/v1/models/coffeModels.js";


describe("coffes controllers", () => {
  //get
  describe("GET /api/v1/coffes with valid params", () => {
    it("should return all coffes", async () => {
      const response = await request(app).get("/api/v1/coffes");
      expect(response.statusCode).toBe(200);
    });
    it("should return instance array", async () => {
      const response = await request(app).get("/api/v1/coffes");
      const { coffe } = response.body;
      expect(Array.isArray(coffe)).toBe(true);
      expect(coffe.length).toBeGreaterThanOrEqual(1);
      if (coffe.length > 0) {
        expect(coffe[0]).toBeInstanceOf(Object);
      }
    });
  });

  //delete
  describe("DELETE /api/v1/coffes/:id with invalid params", () => {
    it("should return a 404, yes id does not match", async () => {
      const fakeId = faker.number.int({ min: 900, max: 1000 }); //seria mas eficaz ocupar uuid
      const response = await request(app).delete(`/api/v1/coffes/${fakeId}`);
      expect(response.statusCode).toBe(404);
    });
  });

  //post
  describe("POST /api/v1/coffes with valid params", () => {
    it("It should return a 201, the coffee was created successfully", async () => {
      const payload = {
        coffe: {
          nombre: faker.person.firstName(),
          tipo: faker.person.firstName(),
        },
      };
      const response = await request(app).post("/api/v1/coffes").send(payload);
      expect(response.statusCode).toBe(201);
    });
  });
  //put invalid params
  describe("PUT /api/v1/coffes/:id with invalid params", () => {
    it("should return status code 400 if ID is different", async () => {
      const fakeId = faker.number.int({ min: 9000, max: 10000 }); // const fakeId = faker.string.uuid();
      console.log(fakeId);
      const payload = {
        coffe: {
          nombre: faker.person.firstName(),
          tipo: faker.person.firstName(),
        },
      };
      const response = await request(app)
        .put(`/api/v1/coffes/${fakeId}`)
        .send(payload);
      expect(response.statusCode).toBe(400);
    });
  });
  //put valid params
  describe("PUT /api/v1/coffes/:id with valid params", () => {
    let existingTravelId;
    beforeEach(async () => {
      //hay librerias que gestionan esto como factory bot, que crea todo el beforeach como esta aqui, asi no lo hacemos a mano, pero el problema es que funciona con clases y las clases no la hemos visto aca en desafio latam, clases es full programacion orientado a objeto como clases de herencia mixsin, metodos de instancia, polivorfirmo tengo que aprender todo esto.
      const payload = {
        coffe: {
          nombre: faker.location.country(),
          tipo: faker.location.country(),
        },
      };

      const coffes = await creatingCoffee(payload.coffe);
      existingTravelId = coffes.id;
    });
    const data = {
      coffe: {
        nombre: faker.location.country(),
        tipo: faker.location.country(),
      },
    };
    it("return 200", async () => {
      const response = await request(app)
        .put(`/api/v1/coffes/${existingTravelId}`)
        .send(data);
      expect(response.statusCode).toBe(200);
    });
  });
});
