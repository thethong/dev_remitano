import { db } from "../libs/db.js";
import * as util from "util";

/**
 * Model: User Model Model
 */
class UserModel {
  /**
   * Get user info by user name
   * @param {String} userName - user Name string
   * @returns {Array} - Array result return result
   */
  async getUserByUserName(userName) {
    try {
      const params = [userName];
      const sql = `SELECT id, user_name, password FROM user WHERE user_name = ?`;

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql, params);

      return rs;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get user info by user name
   * @param {Object} user - user object
   * @returns {Array} - Array result return result
   */
  async createUser(user) {
    try {
      const params = [user.user_name, user.password];
      const sql = `INSERT INTO user (user_name, password) 
                    VALUES (?, ?)`;

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql, params);

      return rs;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

export default UserModel;
