var pool = require("../config/database");

module.exports = {
  getMatchList: async userID => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM matches WHERE user_1 = ? OR user_2 = ? ORDER BY last_message DESC",
        values: [userID, userID]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateNbMsg: async roomID => {
    try {
      var result = await pool.query({
        sql: "UPDATE matches SET last_message = NOW() WHERE room_id = ?",
        values: [roomID]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
