"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const { rds, local } = require("../config/config");
const db = {};

let sequelize = new Sequelize(rds.database, rds.user, rds.password, rds);

// fs.readdirSync(__dirname)
//     .filter((file) => {
//         return (
//             file.indexOf(".") !== 0 &&
//             file !== basename &&
//             file.slice(-3) === ".js"
//         );
//     })
//     .forEach((file) => {
//         const model = require(path.join(__dirname, file))(
//             sequelize,
//             Sequelize.DataTypes
//         );
//         db[model.name] = model;
//     });

// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

const Users = require("./user")(sequelize, Sequelize.DataTypes);
const Auth = require("./auth")(sequelize, Sequelize.DataTypes);
const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);
const Goal = require("./goal")(sequelize, Sequelize.DataTypes);
const Board = require("./board")(sequelize, Sequelize.DataTypes);
const Comment = require("./comment")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db["Users"] = Users;
db["Auth"] = Auth;
db["Post"] = Post;
db["Tag"] = Tag;
db["Goal"] = Goal;
db["Board"] = Board;
db["Comment"] = Comment;

// --------db sync drop----------

db.Post.sync();
db.Tag.sync();
db.Users.sync();
db.Goal.sync();
db.Board.sync();
db.Comment.sync();
db.Auth.sync();

// db.Post.drop();
// db.Tag.drop();
// db.Goal.drop();
// db.Board.drop();
// db.Comment.drop();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
