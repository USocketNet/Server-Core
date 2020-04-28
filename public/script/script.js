const site_url = 'http://'+window.location.host;
const wp_url = 'http://'+window.location.host;

//#region JQuery Mechanism
$(document).ready(function() {

    //Checking and Redirection.
    if(localStorage.getItem('user') === null) {
        if( pname != 'home') {
            window.location.href = site_url;
        }
    } else {
        if( pname != 'signin') {
            window.location.href = site_url + '/profile.html';
        } 
    }

    //Make sure to hide existing alert dialog.
    $("#signin-success-alert").hide();
    $("#signin-error-alert").hide();

    //Change display to login.
    $('#login-form-link').click(function(e) {
		$("#login_form").delay(100).fadeIn(100);
 		$("#register_form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
    });
    
    //Change display to register.
	$('#register-form-link').click(function(e) {
		$("#register_form").delay(100).fadeIn(100);
 		$("#login_form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
    });
});
//#endregion

//#region Login Mechanism.
function onLoginNow() {

    //Instead of using this: $('#login_form').serialize()
    //We try to get element value by id to create new object.
    var signinAppId = document.getElementById('signin-apid').value;
    var signinUname = document.getElementById('signin-uname').value;
    var signinPword = document.getElementById('signin-pword').value;
    var signinData = { "UN": signinUname, "PW": signinPword };
    
    //Make sure to hide existing alert dialog.
    $("#signin-success-alert").hide();
    $("#signin-error-alert").hide();

    //Make sure to disable submit button.
    $("#signin-submit").prop('disabled', true);

    //We make use 
    $.ajax({
        type: "POST",
        url: wp_url + '/wp-json/usocketnet/v1/auth',
        data: signinData,
        dataType: 'json',
        success: function(data) {            
            $("#signin-submit").prop('disabled', false);
          if( data.code === 'success' ) {
            $("#signin-success-alert").fadeTo(5000, 500).slideUp(500, function() {
                $("#signin-success-alert").slideUp(500);
            });

            const userData = data.data;
                userData.apid = signinAppId;
            localStorage['user'] = JSON.stringify(userData);
            window.location.replace(site_url + '/profile.html');
          } else {
            $("#signin-error-alert").fadeTo(5000, 500).slideUp(500, function() {
                $("#signin-error-alert").slideUp(500);
            });
          }
        },
        error: function(xmlHttpReq, textStatus, errorThrown) {
            $("#signin-submit").prop('disabled', false);
            $("#signin-error-alert").fadeTo(5000, 500).slideUp(500, function() {
                $("#signin-error-alert").slideUp(500);
            });
        }
    }); event.preventDefault();
}
//#endregion

//#region Register Mechanism.
function onRegister() {
    console.log('Registering...');
}
//#endregion

//#region Logout Mechanism.
function onLogout() {
    localStorage.clear();
    window.location.replace(site_url);
    console.log('Logging out...');
}
//#endregion
