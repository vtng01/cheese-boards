const { Board, Cheese, User } = require("../models");
const db = require("./db");

async function seed() {
  await db.sync({
    force: true,
  });
}

seed();
