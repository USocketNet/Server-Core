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

	class BC_USN_Authenticate {

		//Get the user session token string and if nothing, create and return one.
		public static function bc_usn_get_session( $user_id ) {
			//Grab WP_Session_Token from wordpress.
			$wp_session_token = WP_Session_Tokens::get_instance($user_id);

			//Create a session entry unto the session tokens of user with X expiry.
			$expiration = time() + apply_filters('auth_cookie_expiration', 1 * DAY_IN_SECONDS, $user_id, true); //
			$session_now = $wp_session_token->create($expiration);
	
			return $session_now;
		}

		//Authenticate user via Rest Api.
		public static function initialize() {
		
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
						"code" => "error",
						"message" => $user->get_error_message(),
					)
				);
			}
	
			return rest_ensure_response( 
				array(
					"code" => "success",
					"message" => "<strong>Success</strong>: Welcome to USocketNet RestAPI.",
					"data" => array(
						"snid" => BC_USN_Authenticate::bc_usn_get_session($user->ID), 
						"wpid" => $user->ID,
						"uname" => $user->data->user_login,
						"dname" => $user->data->display_name,
						"email" => $user->data->user_email,
						"avatar" => get_avatar_url($user->ID, array('size' => 150)),
						"roles" => $user->roles,
						)
					)  
				);
		}
	}

?>