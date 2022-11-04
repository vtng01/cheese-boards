const db = require("../db/db");
const { Board, Cheese, User } = require("../models");

describe("Cheese model testing", () => {
  beforeEach(async () => {
    await Cheese.sync({
      force: true,
    });
  });

  const title = "titleTestData";
  const description = "descriptionTestData";

  async function createData() {
    return await Cheese.create({
      title: title,
      description: description,
    });
  }

  test("table exists after creation by sync method", async () => {
    const result = await db.getQueryInterface().tableExists("Cheeses");
    expect(result).toBeTruthy();
  });

  it("has correct columns", async () => {
    const result = await db.getQueryInterface().describeTable("Cheeses");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
  });

  it("can create data", async () => {
    const result = (await createData()).toJSON();

    const data = await Cheese.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.title).toEqual(title);
    expect(result.description).toEqual(description);
  });

  it("can read data", async () => {
    await createData();

    const result = await Cheese.findOne({
      where: {
        title: title,
      },
    });
    expect(result.title).toEqual(title);
    expect(result.description).toEqual(description);
  });

  it("can update data", async () => {
    await createData();

    const result = await Cheese.findOne({
      where: {
        title: title,
      },
    });

    await result.update({
      description: "new description",
    });
    expect(result.title).toEqual(title);
    expect(result.description).toEqual("new description");
  });

  it("can delete data", async () => {
    await createData();

    await Cheese.destroy({
      where: {
        title: title,
      },
    });

    const result = await Cheese.findOne({
      where: {
        title: title,
      },
    });
    expect(result).toBeNull();
  });
});

describe("Board model testing", () => {
  beforeEach(async () => {
    await Board.sync({
      force: true,
    });
  });

  const type = "typeTestData";
  const description = "descriptionTestData";
  const rating = 5;

  async function createData() {
    return await Board.create({
      type: type,
      description: description,
      rating: rating,
    });
  }

  test("table exists after creation by sync method", async () => {
    const result = await db.getQueryInterface().tableExists("Boards");
    expect(result).toBeTruthy();
  });

  it("has correct columns", async () => {
    const result = await db.getQueryInterface().describeTable("Boards");
    expect(result).toHaveProperty("type");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("rating");
  });

  it("can create data", async () => {
    const result = (await createData()).toJSON();

    const data = await Board.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.type).toEqual(type);
    expect(result.description).toEqual(description);
    expect(result.rating).toBe(rating);
  });

  it("can read data", async () => {
    await createData();

    const result = await Board.findOne({
      where: {
        type: type,
      },
    });

    expect(result.type).toEqual(type);
    expect(result.description).toEqual(description);
    expect(result.rating).toBe(rating);
  });

  it("can update data", async () => {
    await createData();

    const result = await Board.findOne({
      where: {
        type: type,
      },
    });

    await result.update({
      description: "new description",
      rating: 10,
    });

    expect(result.type).toEqual(type);
    expect(result.description).toEqual("new description");
    expect(result.rating).toBe(10);
  });

  it("can delete data", async () => {
    await createData();

    await Board.destroy({
      where: {
        type: type,
      },
    });

    const result = await Board.findOne({
      where: {
        type: type,
      },
    });
    expect(result).toBeNull();
  });

  it("throw validation error on invalid data entry", async () => {
    const result = await Board.create({
      type: type,
      description: description,
      rating: "this is not a number",
    }).catch((e) => {
      return e;
    });
    expect(result.constructor.name).toEqual("ValidationError");
  });

  it("throw validation error on invalid rating entry: when rating < 0", async () => {
    const result = await Board.create({
      type: type,
      description: description,
      rating: -2,
    }).catch((e) => {
      return e;
    });
    expect(result.constructor.name).toEqual("ValidationError");
  });

  it("throw validation error on invalid rating entry: when rating > 0", async () => {
    const result = await Board.create({
      type: type,
      description: description,
      rating: 9001,
    }).catch((e) => {
      return e;
    });
    expect(result.constructor.name).toEqual("ValidationError");
  });
});

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
