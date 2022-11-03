const db = require("../db/db");
const User = require("../models/user.model");

describe("User model testing", () => {
  beforeEach(async () => {
    await User.sync({
      force: true,
    });
  });

  const name = "nameTestData";
  const email = "email@testData.com";

  test("table exists after creation by sync method", async () => {
    const result = await db.getQueryInterface().tableExists("Users");
    expect(result).toBeTruthy();
  });

  it("has correct columns", async () => {
    const result = await db.getQueryInterface().describeTable("Users");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
  });

  it("can insert data", async () => {
    const result = (
      await User.create({
        name: name,
        email: email,
      })
    ).toJSON();

    const data = await User.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.name).toEqual(name);
    expect(result.email).toEqual(email);
  });

  it("throw validation error on invalid name entry", async () => {
    const result = await User.create({
      name: "th1s is not a name!!!",
      email: email,
    }).catch((e) => {
      return e;
    });
    expect(result.constructor.name).toEqual("ValidationError");
  });

  it("throw validation error on invalid email entry", async () => {
    const result = await User.create({
      name: name,
      email: "not a valid email",
    }).catch((e) => {
      return e;
    });
    expect(result.constructor.name).toEqual("ValidationError");
  });
});
