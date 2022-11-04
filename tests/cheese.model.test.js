const Cheese = require("../models/cheese.model");
const db = require("../db/db");

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
