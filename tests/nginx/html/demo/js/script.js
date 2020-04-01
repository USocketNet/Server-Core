const site_url = 'http://localhost/demo';
const wp_url = 'http://localhost/wordpress';

//#region JQuery Mechanism
$(document).ready(function() {

    //Checking and Redirection.
    if(localStorage.getItem('wpid') === null) {
        if( pname != 'home') {
            window.location.href = site_url;
        }
    } else {
        if( pname != 'signin') {
            window.location.href = site_url + '/profile.html';
        } 

        //$('#messages').append('<li style="text-align: center;"><a href onclick="onLogout()">Logout</a></li>');
        document.getElementById('profile-uname').innerText = 'Hello! ' + localStorage['uname'] ;
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
    var signinData = { uname: signinUname, pword: signinPword };
    
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
            console.log(JSON.stringify(data));
            $("#signin-submit").prop('disabled', false);

          if( data.status == 'success' ) {

            $("#signin-success-alert").fadeTo(7000, 500).slideUp(500, function() {
                $("#signin-success-alert").slideUp(500);
            });

            localStorage['wpid'] = data.wpid;
            localStorage['uname'] = data.uname;
            localStorage['email'] = data.email;
            localStorage['session'] = data.session;
            localStorage['user'] = JSON.stringify(data);
            window.location.replace(site_url + '/profile.html');

          } else {

            $("#signin-error-alert").fadeTo(7000, 500).slideUp(500, function() {
                $("#signin-error-alert").slideUp(500);
            });

            //console.log( 'USocketNet: Failed to login!' );

          }
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

//     if( localStorage.getItem("wpid") !== null && localStorage.getItem("snid") !== null ) {
//       $.ajax({
//         type: "POST",
//         url: wp_url + '/wp-json/usocketnet/v1/auth/token',
//         data: { wpid: localStorage['wpid'], snid: localStorage['snid']},
//         dataType: 'json',
//         success: function(data) {
//           if( data.status == 'success' ) {
//             localStorage['user'] = JSON.stringify(data);
//             window.location.replace("http://localhost/demo/chat.html");
//           } else {
//             console.log( 'USocketNet: Failed to login using token!' );
//           }
//         }
//       }); event.preventDefault();
//     }
