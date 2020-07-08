/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);

const username = "newuser3";
const password = "newpass3";
const email = "newuser3@example.org";

describe("login user", () => {
  it("returns error when username not found", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ username, password });

    expect(res.status).to.equal(401);
    expect(res.text).to.equal("wrong username or password");
  });

  it("return error when email not confirmed", async () => {
    await chai
      .request(app)
      .post("/api/auth/register")
      .send({ username, password, email });
    
    const res = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ username, password });
    
    expect(res.status).to.equal(401);
    expect(res.text).to.equal("please confirm your email"); 
  });
});