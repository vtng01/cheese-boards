const Board = require("./board.model");
const Cheese = require("./cheese.model");
const User = require("./user.model");

// relationships
User.hasMany(Board);
Board.belongsTo(User);

// Board.belongsToMany(Cheese, { through: "Board_Cheese" });
// Cheese.belongsToMany(Board, { through: "Board_Cheese" });

module.exports = { Board, Cheese, User };
