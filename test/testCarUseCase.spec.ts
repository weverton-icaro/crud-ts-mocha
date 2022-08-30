import fs from "fs";
import { faker } from "@faker-js/faker";
import chai, { should } from "chai";
import chaiHttp from "chai-http";

chai.use(should);
chai.use(chaiHttp);

describe("Create Car", () => {
  let app = "http://localhost:3001";
  var token: string;
  var id: string;

  it("should be able create a new car", async () => {
    const responseToken = await chai.request(app).post("/session/login").send({
      email: "weverton.dev@gmail.com",
      password: "12345678",
    });

    token = responseToken.body.token;

    const response = await chai
      .request(app)
      .post("/car/create")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        license_plate: faker.vehicle.vrm(),
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        chassis: faker.vehicle.vin(),
        renamed: "45215245632",
        year: "2001",
      });

    id = response.body.id;

    chai.expect(response.status).to.be.equal(201);
    chai.expect(response.body).to.have.property("id");
  });

  it("should be able list all cars", async () => {
    const response = await chai
      .request(app)
      .get("/car/list")
      .set({ Authorization: `Bearer ${token}` });

    chai.expect(response.status).to.be.equal(200);
  });

  it("should be able update cars", async () => {
    const response = await chai
      .request(app)
      .patch(`/car/update/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        license_plate: faker.vehicle.vrm(),
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        chassis: faker.vehicle.vin(),
        renamed: "45215245632",
        year: "2001",
      });

    chai.expect(response.status).to.be.equal(200);
  });

  it("should be aple import cars", async () => {
    const response = await chai
      .request(app)
      .post("/car/import")
      .set({ Authorization: `Bearer ${token}` })
      .attach("file", fs.readFileSync("./carsCSV.exemple.csv"), "cars.csv");

    chai.expect(response.status).to.be.equal(201);
  });

  it("should be aple import images cars", async () => {
    const response = await chai
      .request(app)
      .post(`/car/images/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .set("content-type", "multipart/form-data")
      .attach(
        "images",
        fs.readFileSync("./assets/modelo1.jpeg"),
        "modelo1.jpeg"
      )
      .attach(
        "images",
        fs.readFileSync("./assets/modelo2.jpeg"),
        "modelo2.jpeg"
      );

    chai.expect(response.status).to.be.equal(201);
  });

  it("should be able delete cars", async () => {
    const response = await chai
      .request(app)
      .delete(`/car/delete/${id}`)
      .set({ Authorization: `Bearer ${token}` });

    chai.expect(response.status).to.be.equal(204);
  });
});
