/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import bcrypt from "bcrypt";
import { User  } from "../src/models";

const email = "changePass@example.org";
const username = "changePassUser";
const password = "passwordToChange";

chai.use(chaiHttp);
const agent = chai.request.agent(app);

before(async () => {
  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ 
    email, username, passwordHash, confirmed: true 
  });
});

describe("change password", () => {
  it("password can't be changed without authentication", async () => {
    const res = await agent
      .post("/api/auth/changePassword")
      .send({ oldPassword: password, newPassword: "newPassword1" });

    expect(res.status).to.equal(401);
  });

  it("returns error if current password is incorrect", async () => {
    await agent
      .post("/api/auth/login")
      .send({ username, password });

    const res = await agent
      .post("/api/auth/changePassword")
      .send({ oldPassword: "wrongPassword", newPassword: "newPassword2" });  
    
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("type");
    expect(res.body).to.have.property("message");
    expect(res.body.type).to.equal("oldPassword");
    expect(res.body.message).to.equal("wrong password");
  });

  it("works if current password is correct", async () => {
    await agent
      .post("/api/auth/login")
      .send({ username, password });

    const res = await agent
      .post("/api/auth/changePassword")
      .send({ oldPassword: password, newPassword: "newPassword2" });
    
    expect(res.status).to.equal(200);

    const loginRes = await agent
      .post("/api/auth/login")
      .send({ username, password: "newPassword2" });
    
    expect(loginRes.status).to.equal(200, 
      "Expected logging in with the new password to work.");
  });
});