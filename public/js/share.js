$(document).ready(function () {
  $("#btnShare").click(function () {
    addShareMovie()
  });
})

async function addShareMovie() {
  const baseUrl = window.location.origin
  const rowData = { 
    user_name: $.cookie('user_name'),     // user name login from cookie
    url: $("#inputUrl").val()
  }

  const headerData = { x_authorization: $.cookie('access_token') }

  try {
    const result = await $.ajax({
      url: baseUrl + `/share/share-movie`,
      type: 'POST',
      dataType: 'json',
      data: rowData,
      headers: headerData
    });

    alert(`Share movie success.`)

    
  } catch (error) {
    console.error(error);
  }
}