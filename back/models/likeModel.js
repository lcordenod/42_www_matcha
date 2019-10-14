var pool = require("../config/database");

module.exports = {
  addOne: async (user_id, by_id) => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO likes (user_id, sender_id) VALUES (?, ?)",
        values: [user_id, by_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteOne: async (user_id, by_id) => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM likes WHERE user_id = ? AND sender_id = ?",
        values: [user_id, by_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  checkUserLikedBy: async (user_id, by_id) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM likes WHERE `user_id` = ? AND sender_id = ?",
        values: [user_id, by_id]
      });
      if (result.length !== 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  getUserProfilesLikedId: async userId => {
    try {
      var result = await pool.query({
        sql:
          "SELECT `user_id` FROM likes WHERE `sender_id` = ? ORDER BY `id` ASC",
        values: [userId]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
