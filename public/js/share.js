$(document).ready(function () {
  $("#btnShare").click(function () {
    addShareMovie();
  });
});

/**
 * add url youtube share function
 * @returns {Void} - 
 */
async function addShareMovie() {
  const baseUrl = window.location.origin;
  const rowData = {
    user_name: $.cookie("user_name"), // user name login from cookie
    url: $("#inputUrl").val(),
  };

  const headerData = { x_authorization: $.cookie("access_token") };

  try {
    // request share a movie to server
    const result = await $.ajax({
      url: baseUrl + `/v1/share/share-movie`,
      type: "POST",
      dataType: "json",
      data: rowData,
      headers: headerData,
    });

    alert(`Share movie success.`);
  } catch (error) {
    console.error(error);
    alert("ERROR -- " + error.responseJSON.error_message);
  }
}
