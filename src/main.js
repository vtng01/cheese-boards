const { Board, Cheese, User } = require("../models");

async function main() {
  const user1 = await User.findByPk(1, {
    include: Board,
  });

  console.log("User");
  console.table(user1.toJSON());

  console.log("Boards of user");
  console.table(user1.Boards.map((b) => b.toJSON()));

  const board1 = await Board.findByPk(1, {
    include: Cheese,
  });

  console.log("Board 1 of user");
  console.table(board1.Cheeses.map((c) => c.toJSON()));

  const board2 = await Board.findByPk(2, {
    include: Cheese,
  });

  console.log("Board 2 of user");
  console.table(board2.Cheeses.map((c) => c.toJSON()));
}

main();
