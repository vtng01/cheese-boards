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
    let board1 = await Board.findByPk(1);
    let board2 = await Board.findByPk(2);
    let user1 = await User.findByPk(1);

    await user1.addBoards([board1, board2]);

    const result = await user1.countBoards();
    board1 = await Board.findByPk(1);
    board2 = await Board.findByPk(2);

    let board1User = await board1.getUser();
    let board2User = await board2.getUser();
    user1 = await User.findByPk(1);

    expect(result).toBe(2);
    expect(board1User).toEqual(user1);
    expect(board2User).toEqual(user1);
  });

  test("multiple users cannot have the same board: addUsers function does not exist", async () => {
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

describe("testing association between boards and cheeses", () => {
  beforeEach(async () => {
    await db.sync({
      force: true,
    });

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

    await Cheese.bulkCreate([
      {
        id: 1,
        title: "cheeseTitleOne",
        description: "cheeseDescriptionTwo",
      },
      {
        id: 2,
        title: "cheeseTitleTwo",
        description: "cheeseDescriptionTwo",
      },
    ]);
  });

  test("board can have many cheeses", async () => {
    let board1 = await Board.findByPk(1);
    let cheese1 = await Cheese.findByPk(1);
    let cheese2 = await Cheese.findByPk(2);

    await board1.addCheeses([cheese1, cheese2]);

    board1 = await Board.findByPk(1);
    cheese1 = await Cheese.findByPk(1);
    cheese2 = await Cheese.findByPk(2);

    const cheese1Boards = await cheese1.getBoards();
    const cheese2Boards = await cheese2.getBoards();
    const board1Cheeses = await board1.countCheeses();

    expect(board1Cheeses).toBe(2);
    expect(cheese1Boards[0].id).toBe(1);
    expect(cheese2Boards[0].id).toBe(1);
  });

  test("cheese can have many boards", async () => {
    let cheese1 = await Cheese.findByPk(1);
    let board1 = await Board.findByPk(1);
    let board2 = await Board.findByPk(2);

    await cheese1.addBoards([board1, board2]);

    cheese1 = await Cheese.findByPk(1);
    board1 = await Board.findByPk(1);
    board2 = await Board.findByPk(2);

    const board1Cheeses = await board1.getCheeses();
    const board2Cheeses = await board2.getCheeses();
    const cheese1Boards = await cheese1.countBoards();

    expect(cheese1Boards).toBe(2);
    expect(board1Cheeses[0].id).toBe(1);
    expect(board2Cheeses[0].id).toBe(1);
  });
});
