const Board = require("../models/board.model");
const db = require("../db/db");

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

  it("throw validation error on invalid rating entry: when rating > 10", async () => {
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
