import UserModel from "../models/user.model.js";
import ShareMovieModel from "../models/share-movie.model.js";
import YoutubeHandle from "../utilities/youtube-handle.js";
import axios from "axios";
import responseStatus from "../variables/response-status.js";
import util from "util";

/**
 * API: Share Movie Controller
 */
class ShareController {

  /**
   * Share youtube url using for route API share
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Promise<*>} - json result return for client
   */
  async shareMovie(req, res) {
    try {
      const userName = req.body.user_name;
      const url = req.body.url;

      const userModel = new UserModel();

      // get info user
      const rsUser = await userModel.getUserByUserName(userName);

      // user share movie is not exists
      if (rsUser.length == 0) {
        return res.status(401).json({
          error_message: util.format(
            responseStatus.http.unauthorized.not_exist_user.error_message,
            userName
          ),
        });
      }

      // get user id from result query db
      const userId = rsUser[0].id;
      const shareMovieModel = new ShareMovieModel();

      // add url youtube shared
      await shareMovieModel.addNewShareMovie(userId, url);

      // all success
      return res.status(201).json({
        id: rsUser[0].id,
      });
    } catch (err) {
      return res.status(responseStatus.http.internal_server.status).json({
        error_message: responseStatus.http.internal_server.error_message,
      });
    }
  }

  /**
   * Get list all movie shared by all user using for route API
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Promise<*>} - json result return for client
   */
  async getListAllSharedMovie(req, res) {
    try {
      const shareMovieModel = new ShareMovieModel();

      // get list of all shared movie
      const rsListShared = await shareMovieModel.getListSharedMovie();

      // get list video id from google API
      const listPromiseShared = rsListShared.map(async (item) => {
        const videoId = YoutubeHandle.getIdVideoFromUrl(item.url);
        return axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyDtD-TQwSVfAzAgsbDomex-x6Bqrt_dOjQ&part=snippet,contentDetails,statistics,status&user_name=${item.user_name}`
        );
      });

      const rslistPromiseShared = await Promise.allSettled(listPromiseShared);

      // only handle record with fulfilled status
      const listSharedSendClient = rslistPromiseShared.reduce(
        (filtered, item) => {
          if (item.status === "fulfilled") {
            // get value of param user name from path request
            const params = new URLSearchParams(item.value.request.path);
            const userName = params.get("user_name");

            const objShare = {
              user_name: userName,
              video_id: item.value.data.items[0].id,
              title: item.value.data.items[0].snippet.title,
              description: item.value.data.items[0].snippet.description,
            };

            // add to array share movie
            filtered.push(objShare);
          }
          return filtered;
        },
        []
      );

      // all success
      return res.status(201).json({
        data: listSharedSendClient,
      });
    } catch (err) {
      return res.status(responseStatus.http.internal_server.status).json({
        error_message: responseStatus.http.internal_server.error_message,
      });
    }
  }
}

export default ShareController;
