import chai, { expect } from "chai";
import chaiHttp from "chai-http";

const SERVER_URL = process.env.APP_URL || "http://localhost:3001";

chai.use(chaiHttp);

describe("when the database is empty", () => {
  it("should return 404", async () => {
    const res = await chai
      .request(SERVER_URL)
      .get("/api/quotes/random");
    expect(res.status).equal(404);
  });
});