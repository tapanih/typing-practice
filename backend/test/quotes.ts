import chai from "chai";
import chaiHttp from "chai-http";

const SERVER_URL = process.env.APP_URL || "http://localhost:3001";

chai.use(chaiHttp);

describe("when the database is empty", () => {
  it("should return 404", () => {
    chai
      .request(SERVER_URL)
      .get("/api/quotes/random")
      .then((res) => {
        res.should.have.status(404);
      }).catch((err) => {
        console.log(err);
      });
  });
});