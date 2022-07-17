$(document).ready(function () {
  getListSharedMovie();
});

async function getListSharedMovie() {
  // url base
  const baseUrl = window.location.origin;

  try {
    const result = await $.ajax({
      url: baseUrl + `/v1/share/list-all-shared-movie`,
      type: "GET",
      dataType: "json",
    });

    const listShared = result.data;

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
      for (let index = 0; index < listShared.length; index++) {
        // add html each shared
        $("#ctn-list-shared").append(`<div class="row mt-2">
                                          <div class="col-md-6 text-end">
                                              <div id="share${index}" loading="lazy"></div>
                                          </div>
                                          <div class="col-md-4">
                                              <div class="row mt-2 text-danger">${listShared[index].title}</div>
                                              <div class="row mt-2">Shared by: ${listShared[index].user_name}</div>
                                              <div class="row mt-2">Description:</div>
                                              <div class="row mt-2 yt-description">${listShared[index].description}</div>
                                          </div>
                                      </div>`);

        // create youtube player for each share
        new window.YT.Player(`share${index}`, {
          height: "200",
          width: "360",
          videoId: listShared[index].video_id,
          playerVars: {
            playsinline: 1,
          },
        });
      }
    };
  } catch (error) {
    console.error(error);
  }
}
