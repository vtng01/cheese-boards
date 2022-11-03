const Board = require("../models/board.model");

describe("Board model testing", () => {
  beforeEach(async () => {
    await Board.sync({
      force: true,
    });
  });

  const validationErrorMessage = "validation error was thrown";
  const type = "typeTestData";
  const description = "descriptionTestData";
  const rating = 5;

  it("has correct columns", async () => {
    await Board.create({
      type: type,
      description: description,
      rating: rating,
    });

    const result = await Board.findAndCountAll();
    expect(result["count"]).toBe(1);
  });

  test("data needs to have valid forms", async () => {
    const result = await Board.create({
      type: type,
      description: description,
      rating: "this is a string",
    }).catch(() => {
      return "validation error was thrown";
    });
    expect(result).toEqual(validationErrorMessage);
  });
});
