const { Board, Cheese, User } = require("../models");
const db = reqire("./db");

async function seed() {
  await db.sync({
    force: true,
  });
}

seed();
