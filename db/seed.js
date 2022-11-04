const { Board, Cheese, User } = require("../models");
const db = require("./db");

async function seed() {
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
    {
      id: 3,
      type: "boardTypeThree",
      description: "boardDescriptionThree",
      rating: 3,
    },
    {
      id: 4,
      type: "boardTypeFour",
      description: "boardDescriptionFour",
      rating: 4,
    },
    {
      id: 5,
      type: "boardTypeFive",
      description: "boardDescriptionFive",
      rating: 5,
    },
  ]);

  await Cheese.bulkCreate([
    {
      id: 1,
      title: "cheeseTitleOne",
      description: "cheeseDescriptionOne",
    },
    {
      id: 2,
      title: "cheeseTitleTwo",
      description: "cheeseDescriptionTwo",
    },
    {
      id: 3,
      title: "cheeseTitleThree",
      description: "cheeseDescriptionThree",
    },
    {
      id: 4,
      title: "cheeseTitleFour",
      description: "cheeseDescriptionFour",
    },
    {
      id: 5,
      title: "cheeseTitleFive",
      description: "cheeseDescriptionFive",
    },
  ]);

  await User.bulkCreate([
    { name: "nameOne", email: "one@email.com" },
    { name: "nameTwo", email: "two@email.com" },
    { name: "nameThree", email: "three@email.com" },
    { name: "nameFour", email: "four@email.com" },
    { name: "nameFive", email: "five@email.com" },
    { name: "nameSix", email: "six@email.com" },
    { name: "nameSeven", email: "seven@email.com" },
  ]);

  let cheese = await Cheese.findAll();
  let board = await Board.findAll();
  let user = await User.findAll();

  await board[0].addCheeses([cheese[0], cheese[1], cheese[2]]);
  await cheese[0].addBoards([board[1], board[2]]);
  await user[0].addBoards([board[0], board[1]]);
}

seed();
