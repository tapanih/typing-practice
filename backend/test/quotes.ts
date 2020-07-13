import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import bcrypt from "bcrypt";
import { User, Quote } from "../src/models";

const email = "user@example.org";
const username = "user";
const password = "password";
const content = "This is the content";

chai.use(chaiHttp);
const agent = chai.request.agent(app);

before(async () => {
  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ 
    email, username, passwordHash, confirmed: true 
  });
});

describe("when the database is empty", () => {
  it("should return 404", async () => {
    const res = await agent
      .get("/api/quotes/random");

    expect(res.status).equal(404);
  });

  it("quote cannot be added without authentication", async () => {
    const res = await agent
      .post("/api/quotes")
      .send({ content });
    
    expect(res.status).equal(401);
  });

  it("quote can be added when user is authenticated", async () => {
    await agent
      .post("/api/auth/login")
      .send({ username, password });
    
    const res = await agent
      .post("/api/quotes")
      .send({ content });

    expect(res.status).equal(201);

    const quotes = await Quote.findAll({
      where: {
        content
      }
    });

    expect(quotes).to.have.lengthOf(1);
  });
});