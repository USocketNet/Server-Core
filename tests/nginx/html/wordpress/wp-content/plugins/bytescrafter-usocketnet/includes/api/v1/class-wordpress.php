<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/**
	 * @package bytescrafter-usocketnet-backend
	*/
?>

<?php

	class BC_USocketNet_WP {

		//Get the user session token string and if nothing, create and return one.
		public static function bc_usn_get_session( $user_id ) {
			//Grab WP_Session_Token from wordpress.
			$wp_session_token = WP_Session_Tokens::get_instance($user_id);

			//Create a session entry unto the session tokens of user with X expiry.
			$expiration = time() + apply_filters('auth_cookie_expiration', 1 * DAY_IN_SECONDS, $user_id, true);
			$session_now = $wp_session_token->create($expiration);
	
			return $session_now;
		}

		//Authenticate user via Rest Api.
		public static function bc_usn_authenticate() {
		
			// Check that we're trying to authenticate
			if (!isset($_POST["UN"]) || !isset($_POST["PW"])) {
				return rest_ensure_response( 
					array(
						"code" => "unknown",
						"message" => "Please contact your administrator. Authentication Unknown!",
					)
				);
			}

			//Listens for POST values.
			$username = $_POST["UN"];
			$password = $_POST["PW"];

			//Initialize wp authentication process.
			$user = wp_authenticate($username, $password);
			
			//Check for wp authentication issue.
			if ( is_wp_error($user) ) {
				return rest_ensure_response( 
					array(
						"code" => "unknown",
						"message" => $user->get_error_message(),
					)
				);
			}
	
			//Make an authentication cookie for WP.
			$expiration = time() + apply_filters('auth_cookie_expiration', 1209600, $user->ID, true);
			$cookie = wp_generate_auth_cookie($user->ID, $expiration, 'logged_in');
			preg_match('|src="(.+?)"|', get_avatar($user->ID, 32), $avatar);
			if (!isset($avatar[1])) { $avatar[1] = ''; }
			setcookie('BC_USN', $cookie, $expiration, COOKIEPATH, COOKIE_DOMAIN, false, false);
	
			return rest_ensure_response( 
				array(
					"code" => "success",
					"message" => "<strong>Success</strong>: Welcome to USocketNet Rest Api powered by WordPress.",
					"data" => array(
						"session" => BC_USocketNet_WP::bc_usn_get_session($user->ID),                 
						"cookie" => $cookie, 
						"avatar" => $avatar[1],
						"id" => $user->ID,
						"uname" => $user->data->user_login,
						"dname" => $user->data->display_name,
						"email" => $user->data->user_email,
						"roles" => $user->roles
						)
					)  
				);
		}
	}

?>