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

describe("forgot password", () => {
  it("resetting password works", async () => {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ 
      email, username, passwordHash, confirmed: true 
    });
    const url = await createForgotPasswordLink(user.id);
    const key = url.substring(url.lastIndexOf("/") + 1);

    const res1 = await chai
      .request(app)
      .post("/api/auth/resetPassword")
      .send({ key: "slkjdfksdlfjklsdjkjd", newPassword: "newPassword1" });

    expect(res1.text).to.equal("rejected by server", 
      "Expected a password reset request with an invalid key to fail.");

    const res2 = await chai
      .request(app)
      .post("/api/auth/resetPassword")
      .send({ key, newPassword: "newPassword2" });
    
    expect(res2.text).to.equal("accepted",
      "Expected a password reset request with a valid key to succeed.");

    const res3 = await chai
      .request(app)
      .post("/api/auth/resetPassword")
      .send({ key, newPassword: "newPassword3" });

    expect(res3.text).to.equal("rejected by server",
      "Expected a password reset request with an used key to fail.");

    const loginRes = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ username, password: "newPassword2" });
    
    expect(loginRes.status).to.equal(200, 
      "Expected logging in with the new password to work.");
  });
});