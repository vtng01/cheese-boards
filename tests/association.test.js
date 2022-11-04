const db = require("../db/db");
const { Board, Cheese, User } = require("../models");

describe("testing association between users and boards", () => {
  beforeEach(async () => {
    await db.sync({
      force: true,
    });

    await User.bulkCreate([
      { id: 1, name: "nameOne", email: "one@email.com" },
      { id: 2, name: "nameTwo", email: "two@email.com" },
    ]);

    await Board.bulkCreate([
      {
        id: 1,
        type: "boardTypeOne",
        description: "boardDescriptionOne",
        rating: 1,
      },
      {
        id: 2,
        type: "boardTypeTwo",
        description: "boardDescriptionTwo",
        rating: 2,
      },
    ]);
  });

  test("one user can have multiple boards", async () => {
    const board1 = await Board.findByPk(1);
    const board2 = await Board.findByPk(2);
    let user1 = await User.findByPk(1);

    await user1.addBoards([board1, board2]);

    const result = await user1.countBoards();
    const board1User = await (await Board.findByPk(1)).getUser();

    const board2User = await (await Board.findByPk(1)).getUser();

    user1 = await User.findByPk(1);

    expect(result).toBe(2);
    expect(board1User).toEqual(user1);
    expect(board2User).toEqual(user1);
  });

  test.only("multiple users cannot have the same board: addUsers function does not exist", async () => {
    const board1 = await Board.findByPk(1);
    const user1 = await User.findByPk(1);
    const user2 = await User.findByPk(2);

    async function throwError() {
      try {
        await board1.addUsers([user1, user2]);
      } catch (error) {
        return error;
      }
    }

    const result = await throwError();

    expect(result.constructor.name).toBe("TypeError");
  });
});
