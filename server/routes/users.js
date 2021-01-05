const express = require('express');
const router = express.Router();
const mainController = require("../controllers/index");
//추가
const serveStatic = require('serve-static');
const path = require('path');
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/get', mainController.getTestController);
router.post("/signup", mainController.signUpController);
router.post("/signin", mainController.signInController);
router.post("/signout", mainController.signOutController);

//router.post("/requestAdd", mainController.requestAddController);
//router.delete("/historyClear", mainController.historyClearController);
//router.route('/history');


//추후에 필요?
//router.get("/:id", mainController.redirect);

module.exports = router;


