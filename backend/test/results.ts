import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import bcrypt from "bcrypt";
import { User, Result } from "../src/models";
import { ResultDetails } from "../src/types";
import { toUserId } from "../src/utils";

const email = "user2@example.org";
const username = "user2";
const password = "password2";
const result: ResultDetails = {
  wpm: 60,
  accuracy: 5,
  quoteId: 1
};

chai.use(chaiHttp);
const agent = chai.request.agent(app);

before(async () => {
  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ 
    email, username, passwordHash, confirmed: true 
  });
});

describe("results", () => {
  it("result is added when user is authenticated", async () => {
    const loginRes = await agent
      .post("/api/auth/login")
      .send({ username, password });
    
    const res = await agent
      .post("/api/results")
      .send(result);
    
    expect(res.status).equal(201);

    const userId = toUserId(loginRes.body);
    const results = await Result.findAll({
      where: {
        wpm: result.wpm,
        accuracy: result.accuracy,
        quoteId: result.quoteId,
        userId
      }
    });

    expect(results).to.have.lengthOf(1);    
  });
});