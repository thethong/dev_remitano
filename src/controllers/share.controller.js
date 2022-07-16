import UserModel from "../models/user.model.js";
import ShareMovieModel from "../models/share-movie.model.js";
import YoutubeHandle from "../utilities/youtube-handle.js";

class ShareController {
  async shareMovie(req, res) {
    try {
      const userName = req.body.user_name;
      const url = req.body.url;
      
      const userModel = new UserModel();
      const rsUser = await userModel.getUserByUserName(userName);

      if (rsUser.length == 0) {
        return res.status(401).json({
          error_message: `User name: ${userName} not exist.`,
        });
      }

      // user id
      const userId = rsUser[0].id;
      const shareMovieModel = new ShareMovieModel();

      // add url youtube shared
      await shareMovieModel.addNewShareMovie(userId, url);

      // all success
      return res.status(201).json({
        id: rsUser[0].id
        // user_name: userName,
        // access_token: accessToken,
      });
    } catch (err) {}
  }

  async getListAllSharedMovie(req, res) {
    try {
      const shareMovieModel = new ShareMovieModel();

      // get list of all shared movie
      const rsListShared = await shareMovieModel.getListSharedMovie();

      const idVideo = YoutubeHandle.listIdVideo(rsListShared);

      // all success
      return res.status(201).json({
        rsListShared: rsListShared,
        idVideo: idVideo,
      });
    } catch (err) {}
  }
}

export default ShareController;
