import UserModel from "../models/user.model.js";
import ShareMovieModel from "../models/share-movie.model.js";
import YoutubeHandle from "../utilities/youtube-handle.js";
import axios from "axios";

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

      const listPromiseShared = rsListShared.map(async (item) => {
        const videoId = YoutubeHandle.getIdVideoFromUrl(item.url)
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyDtD-TQwSVfAzAgsbDomex-x6Bqrt_dOjQ&part=snippet,contentDetails,statistics,status&user_name=${item.user_name}`)
       
      })

      const rslistPromiseShared = await Promise.allSettled(listPromiseShared);

      const listSharedSendClient = rslistPromiseShared.reduce((filtered, item) => {
        
        if (item.status === 'fulfilled') {

          // get value of param user name from path request
          const params = new URLSearchParams(item.value.request.path);
          const userName = params.get("user_name");
          
          const objShare = {
            user_name: userName,
            video_id: item.value.data.items[0].id,
            title: item.value.data.items[0].snippet.title,
            description: item.value.data.items[0].snippet.description,
          }

          // add to array
          filtered.push(objShare);
        }
        return filtered;
      }, []);


      // all success
      return res.status(201).json({
        data: listSharedSendClient,
      });
    } catch (err) {}
  }
}

export default ShareController;
