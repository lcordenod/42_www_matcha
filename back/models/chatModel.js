var pool = require("../config/database");

module.exports = {
  createChatRoom: async data => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO matches (room_id, user_1, user_2, username_1, username_2) VALUES (?)",
        values: [data]
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  saveMessage: async data => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO messages (content, user_id, room_id) VALUES (?)",
        values: [data]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getMessages: async room_id => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM messages WHERE room_id = ?",
        values: [room_id]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  saveNotification: async data => {
    try {
      var result = await pool.query({
        sql:
          "INSERT INTO notification (user_id, sender_id, type, data, reference) VALUES (?)",
        values: [data]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getCountNotification: async (userID, data) => {
    try {
      var result = await pool.query({
        sql:
          "SELECT COUNT (*) FROM notification WHERE `user_id` = ? AND type = 2 AND `isRead` = 0 AND NOT `sender_id` IN (?)",
        values: [userID, data]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  getListNotification: async (userID, data) => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM notification WHERE `user_id` = ? AND type = 2 AND `isRead` = 0 AND NOT `sender_id` IN (?)",
        values: [userID, data]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  alreadyExists: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM matches WHERE `user_1` = ? AND `user_2`= ? OR `user_1` = ? AND `user_2` = ?",
        values: [user_id, target_id, target_id, user_id]
      });
      if (result.length) return true;
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  },

  readNotification: async (type, ref, userID) => {
    try {
      var result = await pool.query({
        sql:
          "DELETE FROM notification WHERE type = ? AND reference = ? AND user_id = ?",
        values: [type, ref, userID]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
