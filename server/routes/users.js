var express = require('express');
var router = express.Router();
const mainController = require("../controllers/index");
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.post("/signin", mainController.signInController);
router.post("/signout", mainController.signOutController);
//추후에 필요?
//router.get("/:id", mainController.redirect);

module.exports = router;
