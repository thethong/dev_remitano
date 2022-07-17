class YoutubeHandle {
  
  static getIdVideoFromUrl(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
      console.error("Error url: " + url)
    }
  }
}

export default YoutubeHandle;