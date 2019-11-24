<?php
  if ( isset($_SESSION['wpid']) && isset($_SESSION['snid']) )
  {
    echo " <script> console.log('LOGGED IN'); </script>";
    header( "Location: chat.php" );
    exit ;
  }
?>

<!doctype html>
<html>
  <head>
    <title>USocketNet - Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="index.css">
  </head>
  <body>

    <h2>WELCOME!</h2>
    <p>This is only a demo of the project USocketNet.</p>

    <form id="login_form" method="post">
      <div class="imgcontainer">
        <img src="logo.png" alt="Avatar" class="avatar">
      </div>
    
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input id="uname" type="text" placeholder="Enter Username" name="uname" required>
    
        <label for="pword"><b>Password</b></label>
        <input id="pword" type="password" placeholder="Enter Password" name="pword" required>
            
        <button type="submit">Login</button>
        <!-- <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label> -->
      </div>
    
      <!-- <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="pword">Forgot <a href="#">password?</a></span>
      </div> -->
    </form>

    <script src="jquery-1.11.1.js"></script>
    <script>
      $(document).ready(function() {

        if( localStorage['wpid'] != 'undefined' && localStorage['snid'] != 'undefined') {
          $.ajax({
            type: "POST",
            url: 'http://localhost/wordpress/wp-json/usocketnet/v1/auth/token',
            data: { wpid: localStorage['wpid'], snid: localStorage['snid']},
            dataType: 'json',
            success: function(data) {
              if( data.status == 'success' ) {
                window.location.replace("http://localhost/demo/chat.php");
              } else {
                console.log( 'USocketNet: Failed to login using token!' );
              }
            }
          }); event.preventDefault();
        }

      });

      $( "#login_form" ).submit(function( event ) {

        $.ajax({
          type: "POST",
          url: 'http://localhost/wordpress/wp-json/usocketnet/v1/auth',
          data: $('#login_form').serialize(),
          dataType: 'json',
          success: function(data) {
            if( data.status == 'success' ) {
              localStorage['wpid'] = data.uid;
              localStorage['snid'] = data.session;
              window.location.replace("http://localhost/demo/chat.php");
            } else {
              console.log( 'USocketNet: Failed to login!' );
            }
          }
        }); event.preventDefault();

      });
    </script>
  </body>
</html>