import constant from "../variables/constant.js";

/**
 * Utility: Youtube Handle
 */
class YoutubeHandle {
  static getIdVideoFromUrl(url) {
    const regExp = constant.MATCH_TYPE_YOUTUBE_URL
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
      console.error("Error url: " + url);
    }
  }
}

export default YoutubeHandle;
