/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { expect, AssertionError } from "chai";
import { parseEmail, parseWPM, parseAccuracy, parseContent, parseUsername, parsePassword } from "../src/utils";

describe("utils", () => {
  it("content is parsed correctly", () => {
    const validContents = [
      "A",
      "This is a valid content",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id lorem vitae tellus venenatis accumsan " +
      "a nec justo. Vivamus pulvinar orci et sem iaculis tempus. Curabitur in tincidunt libero, at sagittis nibh. " +
      "Suspendisse in magna feugiat, sodales ex at, pretium nisi. Vivamus commodo maximus posuere. " +
      "Vestibulum imperdiet, ipsum a pharetra gravida, mauris erat aliquet tortor, sit amet fermentum " +
      "elit sem eget est. Curabitur eros nibh, iaculis non tortor et, pretium blandit dui. Nulla facilisi. Praesent in."
    ];

    const invalidContents = [
      undefined,
      5,
      "",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum, odio sollicitudin consectetur auctor, " +
      "elit ipsum elementum lectus, et fermentum felis sem ac massa. Praesent venenatis metus in urna semper, nec dignissim " +
      "libero dapibus. Mauris at odio nisl. Duis fringilla eros et urna placerat, consequat blandit massa rhoncus. " +
      "Cras sollicitudin nunc ipsum. Praesent sed aliquet enim, sed tincidunt augue. Duis et odio eget diam elementum ultrices. " +
      "Nullam in ligula eu eros venenatis iaculis sit augue."
    ];

    validContents.forEach((content) => {
      try {
        expect(parseContent(content)).to.equal(content);
      } catch (error) {
        throw new AssertionError(`Expected ${content} to be considered as a valid content.`);
      }
    });

    invalidContents.forEach((content) => {
      expect(() => parseContent(content), `Expected ${content} to be considered as an invalid content.`)
        .to.throw("Incorrect or missing content");
    });
  });

  it("username is parsed correctly", () => {
    const validUsernames = [
      "test",
      "a",
      "a long name with spaces is valid, really?"
    ];

    const invalidUsernames = [
      "",
      1,
      { username: "user" }
    ];

    validUsernames.forEach((username) => {
      try {
        expect(parseUsername(username)).to.equal(username);
      } catch (error) {
        throw new AssertionError(`Expected ${username} to be considered as a valid username.`);
      }
    });

    invalidUsernames.forEach((username) => {
      expect(() => parseUsername(username), `Expected ${username} to be considered as an invalid username.`)
        .to.throw("Incorrect or missing username");
    });
  });

  it("password is parsed correctly", () => {
    const validPasswords = [
      "hunter2",
      "password",
      "aku ankka"
    ];

    const invalidPasswords = [
      "",
      "this password is too long for the hashing algorithm so..........."
    ];

    validPasswords.forEach((password) => {
      try {
        expect(parsePassword(password)).to.equal(password);
      } catch (error) {
        throw new AssertionError(`Expected ${password} to be considered as a valid password.`);
      }
    });

    invalidPasswords.forEach((password) => {
      expect(() => parsePassword(password), `Expected ${password} to be considered as an invalid password.`)
        .to.throw("Incorrect or missing password");
    });
  });

  it("email is parsed correctly", () => {
    const validEmails = [
      "hello@example.org",
      "the-local-part-is-exactly-sixty-three-characters-long-wheeeeeee@this-is-a-domain.org",
      "these-should-be-valid-characters+-1234567890AZ@ABCDEFGHIJKLMNOPQRSTUVWXYZ-1234567890.org"
    ];

    const invalidEmails = [
      undefined,
      null,
      3,
      "",
      "no-at-sign",
      "no-second-part-after-at@",
      "@no-first-part-before-at",
      '"no-double-quotes"@example.org',
      "'no-single-quotes'@example.org",
      "`no-back-ticks`@example.org",
      "no-weird-symbols-in-domain@do#ain.net",
      "no-weird-symbols-in-domain@dom@in.net",
      "the-local-part-should-be-no-more-than-sixty-three-characters-long@example.org",
      "the-total-length-should-be-no-more-than-254-characters-long@very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-very-long.domain.net",
    ];

    validEmails.forEach((email) => {
      try {
        expect(parseEmail(email)).to.equal(email);
      } catch (error) {
        throw new AssertionError(`Expected ${email} to be considered as a valid email.`);
      }
    });

    invalidEmails.forEach((email) => {
      expect(() => parseEmail(email), `Expected ${email} to be considered as an invalid email.`)
        .to.throw("Incorrect or missing email");
    });
  });

  it("wpm is parsed correctly", () => {
    const validWPMs = [
      1, 50, 100, 400
    ];

    const invalidWPMs = [
      undefined, NaN, -100.5, -1, 0, 0.2343, 45.1, 401, 405.5, { wpm: 5 }, "50"
    ];

    validWPMs.forEach((wpm => {
      try {
        expect(parseWPM(wpm)).to.equal(wpm);
      } catch (error) {
        throw new AssertionError(`Expected ${wpm} to be considered as a valid WPM.`);
      }
    }));

    invalidWPMs.forEach((wpm) => {
      expect(() => parseWPM(wpm), `Expected ${wpm} to be considered as an invalid WPM.`)
        .to.throw("Incorrect or missing WPM");
    });
  });

  it("accuracy is parsed correctly", () => {
    const validAccuracies = [
      1, 20, 50, 100
    ];

    const invalidAccuracies = [
      undefined, NaN, -40.5, -1, 0, 13.5, 45.1, 100.01, 101, { accuracy: 50 }, "5"
    ];

    validAccuracies.forEach((accuracy) => {
      try {
        expect(parseAccuracy(accuracy)).to.equal(accuracy);
      } catch (error) {
        throw new AssertionError(`Expected ${accuracy} to be considered as a valid accuracy.`);
      }
    });

    invalidAccuracies.forEach((accuracy) => {
      expect(() => parseAccuracy(accuracy), `Expected ${accuracy} to be considered as an invalid accuracy.`)
        .to.throw("Incorrect or missing accuracy");
    });
  });
});