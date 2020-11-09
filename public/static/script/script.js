const site_url = 'http://'+window.location.host;
const wp_url = 'http://10.12.91.198';

//#region JQuery Mechanism
$(document).ready(function() {

    //Checking and Redirection.
    if(localStorage.getItem('user') === null) {
        if( page != 'home') {
            window.location.href = site_url;
        }
    } else {
        if( page == 'home') {
            window.location.href = site_url + '/dashboard';
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
        url: wp_url + '/wp-json/usocketnet/v1/user/auth',
        data: signinData,
        dataType: 'json',
        success: function(data) {            
            $("#signin-submit").prop('disabled', false);
          if( data.status == 'success' ) {
            $("#signin-success-alert").fadeTo(5000, 500).slideUp(500, function() {
                $("#signin-success-alert").slideUp(500);
            });

            const userData = data.data;
            localStorage['user'] = JSON.stringify(userData);
            window.location.replace(site_url + '/dashboard');
          } else {
            $('#auth-error-message').text( data.message );
            $("#signin-error-alert").fadeTo(5000, 500).slideUp(500, function() {
                $("#signin-error-alert").slideUp(500);
            });
          }
        },
        error: function(xmlHttpReq, textStatus, errorThrown) {
            $("#signin-submit").prop('disabled', false);
            $('#auth-error-message').text( textStatus + ": " + errorThrown );
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
