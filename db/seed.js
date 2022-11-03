const { Board, Cheese, User } = require("../models");
const db = require("./db");

async function seed() {
  await db.sync({
    force: true,
  });

  const err = await Board.create({
    type: 1,
    description: 1,
    rating: "how is this in here?",
  }).catch((error) => {
    return "error is thrown";
  });
  console.log(err);
}

seed();
