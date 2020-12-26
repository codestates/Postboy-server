var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _category = require("./category");
var _history = require("./history");
var _request = require("./request");
var _timestamps = require("./timestamps");
var _user = require("./user");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var history = _history(sequelize, DataTypes);
  var request = _request(sequelize, DataTypes);
  var timestamps = _timestamps(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  history.belongsTo(request, { foreignKey: "request_id"});
  request.hasMany(history, { foreignKey: "request_id"});
  history.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(history, { foreignKey: "user_id"});

  return {
    SequelizeMeta,
    category,
    history,
    request,
    timestamps,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
