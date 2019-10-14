var pool = require("../config/database");

module.exports = {
  findOne: async (field, data) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: ["pictures", field, data]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  createOne: async data => {
    try {
      var result = await pool.query({
        sql:
          "INSERT INTO pictures (user_id, url, pic_index, profile_picture) VALUES (?)",
        values: [data]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  findProfile: async (field, data) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? AND profile_picture = 1",
        values: ["pictures", field, data]
      });
      if (result.length) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteOne: async (id, pic_index) => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM pictures WHERE user_id = ? AND pic_index = ?",
        values: [id, pic_index]
      });

      var userPictureRemaining = await pool.query({
        sql: "SELECT * FROM pictures WHERE user_id = ?",
        values: [id]
      });

      if (userPictureRemaining.length === 0) {
        removeLastUserPictureFromUserTable = await pool.query({
          sql: "UPDATE users SET profile_picture_url = ? WHERE id = ?",
          values: ["", id]
        });
      }

      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateOne: async (id, data) => {
    try {
      var PicIndexAlreadyExists = await pool.query({
        sql: "SELECT * FROM pictures WHERE user_id = ? AND pic_index = ?",
        values: [id, data.pic_index]
      });

      if (PicIndexAlreadyExists.length !== 0) {
        var result = await pool.query({
          sql:
            "UPDATE pictures SET url = ?, profile_picture = ? WHERE user_id = ? AND pic_index = ?",
          values: [data.url, data.profile_picture, id, data.pic_index]
        });

        if (data.profile_picture === 1) {
          await pool.query({
            sql: "UPDATE users SET profile_picture_url = ? WHERE id = ?",
            values: [data.url, id]
          });
        }
      } else {
        var result = await pool.query({
          sql:
            "INSERT INTO pictures(user_id, url, pic_index, profile_picture) VALUES (?, ?, ?, ?)",
          values: [id, data.url, data.pic_index, data.profile_picture]
        });

        if (data.profile_picture === 1) {
          await pool.query({
            sql: "UPDATE users SET profile_picture_url = ? WHERE id = ?",
            values: [data.url, id]
          });
        }
      }
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateUserProfilePicture: async (id, pic_index, pic_url) => {
    try {
      await pool.query({
        sql:
          "UPDATE pictures SET profile_picture = 0 WHERE user_id = ? AND profile_picture = 1",
        values: [id]
      });

      var result = await pool.query({
        sql:
          "UPDATE pictures SET profile_picture = 1 WHERE user_id = ? AND pic_index = ?",
        values: [id, pic_index]
      });

      var result2 = await pool.query({
        sql: "UPDATE users SET profile_picture_url = ? WHERE id = ?",
        values: [pic_url, id]
      });

      if (result && result2) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteUserAllPictures: async id => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM pictures WHERE user_id = ?",
        values: [id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  getPicturesList: async data => {
    try {
      var result = await pool.query({
        sql:
          "SELECT * FROM pictures WHERE user_id IN (?) AND profile_picture = 1",
        values: [data]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
