import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import bcrypt from "bcrypt";
import { User  } from "../src/models";
import { createForgotPasswordLink } from "../src/utils/links";

const email = "forgotPass@example.org";
const username = "forgotPassUser";
const password = "forgottenPassword";

chai.use(chaiHttp);
const agent = chai.request.agent(app);

describe("forgot password", () => {
  it("resetting password works", async () => {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ 
      email, username, passwordHash, confirmed: true 
    });
    const url = await createForgotPasswordLink(user.id);
    const key = url.substring(url.lastIndexOf("/") + 1);

    const res1 = await agent
      .post("/api/auth/resetPassword")
      .send({ key: "slkjdfksdlfjklsdjkjd", newPassword: "newPassword1" });

    expect(res1.body).to.eql({ type: "password", message: "rejected by server" }, 
      "Expected a password reset request with an invalid key to fail.");

    const res2 = await agent
      .post("/api/auth/resetPassword")
      .send({ key, newPassword: "newPassword2" });
    
    expect(res2.text).to.equal("accepted",
      "Expected a password reset request with a valid key to succeed.");

    const res3 = await agent
      .post("/api/auth/resetPassword")
      .send({ key, newPassword: "newPassword3" });

    expect(res3.body).to.eql({ type: "password", message: "rejected by server" },
      "Expected a password reset request with an used key to fail.");

    const loginRes = await agent
      .post("/api/auth/login")
      .send({ username, password: "newPassword2" });
    
    expect(loginRes.status).to.equal(200, 
      "Expected logging in with the new password to work.");
  });
});