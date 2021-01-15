var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _likes = require("./likes");
var _posts = require("./posts");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(comments, { foreignKey: "user_id"});
  comments.belongsTo(posts, { foreignKey: "post_id"});
  posts.hasMany(comments, { foreignKey: "post_id"});
  likes.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(likes, { foreignKey: "user_id"});
  likes.belongsTo(posts, { foreignKey: "post_id"});
  posts.hasMany(likes, { foreignKey: "post_id"});
  posts.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(posts, { foreignKey: "user_id"});

  return {
    comments,
    likes,
    posts,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
