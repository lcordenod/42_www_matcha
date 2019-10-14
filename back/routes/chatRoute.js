var express = require("express");
var chatController = require("../controllers/chatController");

exports.router = (() => {
  var chatRouter = express.Router();

  chatRouter.route('/room/:room_id').get(chatController.getMessages);
  chatRouter.route('/matches/:token').get(chatController.getMatchList);
  chatRouter.route('/notification/list/:userID').get(chatController.getListNotification);
  chatRouter.route('/notification/messages/:userID').get(chatController.getCountMsgNotification);

  return chatRouter;
})();
