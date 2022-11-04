const User = require("../models/user.model");
const db = require("../db/db");

describe("User model testing", () => {
  beforeEach(async () => {
    await User.sync({
      force: true,
    });
  });

  const name = "nameTestData";
  const email = "email@testData.com";

  async function createData() {
    return await User.create({
      name: name,
      email: email,
    });
  }

  test("table exists after creation by sync method", async () => {
    const result = await db.getQueryInterface().tableExists("Users");
    expect(result).toBeTruthy();
  });

  it("has correct columns", async () => {
    const result = await db.getQueryInterface().describeTable("Users");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
  });

  it("can create data", async () => {
    const result = (await createData()).toJSON();

    const data = await User.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.name).toEqual(name);
    expect(result.email).toEqual(email);
  });

  it("can read data", async () => {
    await createData();

    const result = await User.findOne({
      where: {
        name: name,
      },
    });

    expect(result.name).toEqual(name);
    expect(result.email).toEqual(email);
  });

  it("can update data", async () => {
    await createData();

    const result = await User.findOne({
      where: {
        name: name,
      },
    });

    await result.update({
      email: "new@email.com",
    });

    expect(result.name).toEqual(name);
    expect(result.email).toEqual("new@email.com");
  });

  it("can delete data", async () => {
    await createData();

    await User.destroy({
      where: {
        name: name,
      },
    });

    const result = await User.findOne({
      where: {
        name: name,
      },
    });

    expect(result).toBeNull();
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
