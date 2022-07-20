import { db } from "../libs/db.js";
import * as util from "util";

/**
 * Model: Share Movie Model
 */
class ShareMovieModel {
  /**
   * Add new one link youtube share
   * @param {Int} userId - userId integer
   * @param {String} url - url string
   * @returns {Array} - Array result return result
   */
  async addNewShareMovie(userId, url) {
    try {
      const params = [userId, url];
      const sql = `INSERT INTO share_movie (user_id, url) 
                    VALUES (?, ?)`;

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql, params);

      return rs;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * get list movie shared
   * @returns {Array} - Array result return result
   */
  async getListSharedMovie() {
    try {
      const sql = ` SELECT u.user_name, s.url  
                    FROM user u
                    INNER JOIN share_movie s ON u.id = s.user_id`;

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql);

      return rs;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ShareMovieModel;
