/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { User } from "../src/models";

chai.use(chaiHttp);

const username = "testuser";
const password = "testpass";
const email = "test@example.org";

describe("register user", () => {
  it("user can register", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/register")
      .send({ username, password, email });

    expect(res.status).equal(201);
    expect(res.text).equal("OK");

    const users = await User.findAll({
      where: {
        username, email
      }
    });
    expect(users).to.have.lengthOf(1);
  });

  it("duplicate email checked", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/register")
      .send({ username: "user2", password, email });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("type");
    expect(res.body).to.have.property("message");
    expect(res.body.type).to.equal("email");
    expect(res.body.message).to.equal("email taken");

    const users = await User.findAll({
      where: {
        username, email
      }
    });
    expect(users).to.have.lengthOf(1);
  });

  it("duplicate username checked", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/register")
      .send({ username, password, email: "user2@example.org" });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("type");
    expect(res.body).to.have.property("message");
    expect(res.body.type).to.equal("username");
    expect(res.body.message).to.equal("username taken");

    const users = await User.findAll({
      where: {
        username, email
      }
    });
    expect(users).to.have.lengthOf(1);
  });
});