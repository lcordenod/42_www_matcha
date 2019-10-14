var pool = require("../config/database");

module.exports = {
  findOne: async id => {
    try {
      var result = await pool.query({
        sql:
          "SELECT user_tags.tag_id, tags.value FROM user_tags INNER JOIN tags ON user_tags.tag_id = tags.tag_id WHERE user_tags.user_id = ?",
        values: [id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  addOne: async (id, tag_id) => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO user_tags (user_id, tag_id) VALUES (?, ?)",
        values: [id, tag_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteOne: async (id, tag_id) => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM user_tags WHERE user_id = ? AND tag_id = ?",
        values: [id, tag_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  findAllTags: async () => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM `tags`"
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteUserAllTags: async id => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM user_tags WHERE user_id = ?",
        values: [id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getAllUserTags: async id => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM user_tags WHERE user_id = ?",
        values: [id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
