
import { db } from "../libs/db.js"
import * as util from "util"

class ShareMovieModel {

  async addNewShareMovie (userId, url) {
    try {
      const params = [userId, url]
      const sql = `INSERT INTO share_movie (user_id, url) 
                    VALUES (?, ?)`

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql, params);

      return rs;
    } catch (err) {
      throw new Error(err)
    }
  }

  async getListSharedMovie () {
    try {
      const sql = ` SELECT u.user_name, s.url  
                    FROM user u
                    INNER JOIN share_movie s ON u.id = s.user_id`

      const query = util.promisify(db.query).bind(db);
      const rs = await query(sql);

      return rs;
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ShareMovieModel;