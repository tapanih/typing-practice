import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

chai.use(chaiHttp);

const username = "testuser";
const password = "testpass";
const email = "test@example.org";

describe("register user", () => {
  it("check for duplicate email", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/register")
      .send({ username, password, email });
    expect(res.status).equal(201);
    expect(res.text).equal("OK");
  });
});