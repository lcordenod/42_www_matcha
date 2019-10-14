var pool = require("../config/database");

module.exports = {
  addOne: async data => {
    try {
      await pool.query({
        sql:
          "INSERT INTO notification (user_id, sender_id, sender_username, type, data) VALUES (?)",
        values: [data]
      });
      //console.log(result);
      //if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteOne: async (target_id, user_id, type) => {
    try {
      await pool.query({
        sql:
          "DELETE FROM notification WHERE user_id = ? AND sender_id = ? AND type = ?",
        values: [target_id, user_id, type]
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  getNotification: async userID => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM notification WHERE `user_id` = ? AND type != 2 ORDER BY date DESC",
        values: [userID]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  dismissNotif: async userID => {
    try {
      var result = await pool.query({
        sql: "UPDATE notification SET `isRead`= 1 WHERE `user_id`= ?",
        values: [userID]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  alreadyExists: async (type, user_id, target_id) => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM notification WHERE `user_id` = ? AND `sender_id` = ? AND type = ?",
        values: [target_id, user_id, type]
      });
      //console.log(result);
      return result.length > 0 ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  },

  getUserProfilesVisitedId: async userId => {
    try {
      var result = await pool.query({
        sql:
          "SELECT `user_id` FROM notification WHERE `sender_id` = ? AND type = 'visit' ORDER BY date DESC",
        values: [userId]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
