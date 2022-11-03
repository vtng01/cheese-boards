const db = require("../db/db");
const Board = require("../models/board.model");

describe("Board model testing", () => {
  beforeEach(async () => {
    await Board.sync({
      force: true,
    });
  });

  const type = "typeTestData";
  const description = "descriptionTestData";
  const rating = 5;

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

  it("can insert data", async () => {
    const result = (
      await Board.create({
        type: type,
        description: description,
        rating: rating,
      })
    ).toJSON();
    const data = await Board.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.type).toEqual(type);
    expect(result.description).toEqual(description);
    expect(result.rating).toBe(rating);
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
});
