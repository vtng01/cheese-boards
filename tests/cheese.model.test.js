const db = require("../db/db");
const Cheese = require("../models/cheese.model");

describe("Cheese model testing", () => {
  beforeEach(async () => {
    await Cheese.sync({
      force: true,
    });
  });

  const title = "titleTestData";
  const description = "descriptionTestData";

  test("table exists after creation by sync method", async () => {
    const result = await db.getQueryInterface().tableExists("Cheeses");
    expect(result).toBeTruthy();
  });

  it("has correct columns", async () => {
    const result = await db.getQueryInterface().describeTable("Cheeses");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
  });

  it("can insert data", async () => {
    const result = (
      await Cheese.create({
        title: title,
        description: description,
      })
    ).toJSON();

    const data = await Cheese.findAndCountAll();

    expect(data.count).toBe(1);
    expect(result.title).toEqual(title);
    expect(result.description).toEqual(description);
  });
});
