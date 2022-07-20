$(document).ready(function () {
  // check status login from cookie
  if (isLogined()) {
    $("#cntLoginRegister").hide();
    $("#cntLogined").show();
    $("#lblUserName").html($.cookie("user_name"));
  } else {
    $("#cntLoginRegister").show();
    $("#cntLogined").hide();
  }

  // click login or register button
  $("#btnLoginRegister").click(function () {
    // request login or register to server
    loginOrRegister();
  });

  // click Logout
  $("#btnLogout").click(function () {
    $("#cntLogined").hide();
    $("#cntLoginRegister").show();

    // clear cookie of user login
    $.removeCookie("user_name");
    $.removeCookie("access_token");

    // back to Home page
    const baseUrl = window.location.origin;
    window.location.href = baseUrl + `/`;
  });

  // click share movie
  $("#btnShareMovie").click(function () {
    const baseUrl = window.location.origin;
    window.location.href = baseUrl + `/share`;
  });
});

/**
 * login or register user function
 * @returns {Void} - 
 */
async function loginOrRegister() {
  // url
  const baseUrl = window.location.origin;
  const rowData = {
    user_name: $("#inputUserName").val(),
    password: $("#inputPassword").val(),
  };

  try {
    // request API login or register
    result = await $.ajax({
      url: baseUrl + `/v1/auth/login-register`,
      type: "POST",
      dataType: "json",
      data: rowData,
    });

    // save info to cookie
    $.cookie("user_name", result.user_name, { expires: 1 });
    $.cookie("access_token", result.access_token, { expires: 1 });

    $("#cntLoginRegister").hide();
    $("#cntLogined").show();
    $("#lblUserName").html(result.user_name);
  } catch (error) {
    console.error(error);
    alert("ERROR -- " + error.responseJSON.error_message);
  }
}

/**
 * check is logined
 * @returns {boolean} - true: is login/ false is not logined
 */
function isLogined() {
  if ($.cookie("user_name") && $.cookie("access_token")) {
    return true;
  }

  return false;
}
