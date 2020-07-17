import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { User } from "../src/models";

chai.use(chaiHttp);

const username = "newuser";
const password = "newpass";
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
      .send({ username: "newuser2", password, email });

    expect(res.status).to.equal(401);
    expect(res.body).to.eql({ type: "email", message: "email taken"});

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
      .send({ username, password, email: "newuser2@example.org" });

    expect(res.status).to.equal(401);
    expect(res.body).to.eql({ type: "username", message: "username taken" });

    const users = await User.findAll({
      where: {
        username, email
      }
    });
    expect(users).to.have.lengthOf(1);
  });
});