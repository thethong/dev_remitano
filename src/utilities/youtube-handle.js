class YoutubeHandle {
  
  getIdVideoFromUrl(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      console.error("Error url: " + url)
      //error
    }
  }

  static listIdVideo(listShared) {
    
    // const url = "https://www.youtube.com/watch?v=qlOH-4_LrvE"
    // const idVideo = this.prototype.getIdVideoFromUrl(url)
    // return idVideo

    const self = this;

    return listShared.map((item) => {
      const videoId = self.prototype.getIdVideoFromUrl(item.url)
      return {
        user_name: item.user_name,
        url: item.url,
        video_id: videoId
      }
    })
  }
}

export default YoutubeHandle;