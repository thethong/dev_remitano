$(document).ready(function () {
  // check status login from cookie
  if(isLogined()) {
    $("#cntLoginRegister").hide();
    $("#cntLogined").show();
    $("#lblUserName").html($.cookie('user_name'));
  } else {
    $("#cntLoginRegister").show();
    $("#cntLogined").hide();
  }

  $("#btnLoginRegister").click(function () {
    
    loginOrRegister();
  });


  // click Logout
  $("#btnLogout").click(function () {
    $("#cntLogined").hide();
    $("#cntLoginRegister").show();
    
    // clear cookie of user login
    $.removeCookie('user_name');
    $.removeCookie('access_token');

    // back to Home page
    const baseUrl = window.location.origin
    window.location.href = baseUrl + `/`;
  });

  $("#btnShareMovie").click(function () {
    const baseUrl = window.location.origin
    window.location.href = baseUrl + `/share`;
  });
})

async function loginOrRegister() {
  // url
  const baseUrl = window.location.origin
  const rowData = { 
    user_name: $("#inputUserName").val(), 
    password: $("#inputPassword").val()
  }

  try {
    result = await $.ajax({
      url: baseUrl + `/auth/login-register`,
      type: 'POST',
      dataType: 'json',
      data: rowData
    });

    // save info to cookie
    $.cookie('user_name', result.user_name, { expires: 7 });
    $.cookie('access_token', result.access_token, { expires: 7 });
    // alert($.cookie('user_name'))

    $("#cntLoginRegister").hide();
    $("#cntLogined").show();
    $("#lblUserName").html(result.user_name);
  } catch (error) {
    console.error(error);
  }
}

function afterLogin() {

}

function isLogined() {
  if($.cookie('user_name') && $.cookie('access_token')) {
    return true
  }

  return false
}