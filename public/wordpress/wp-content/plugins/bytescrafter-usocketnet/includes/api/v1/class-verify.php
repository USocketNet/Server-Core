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
	class BC_USN_Verification {

		public static function initialize() {

			// STEP 1: Check if WPID and SNID is passed as this is REQUIRED!
			if (!isset($_POST["wpid"]) || !isset($_POST["snid"]) ) {
				return rest_ensure_response( 
					array(
						"status" => "unknown",
						"message" => "Please contact your administrator. Verification Unknown!",
					)
				);
			}
			$user_id = $_POST["wpid"];
			$session_token = $_POST["snid"];

			// STEP 2: Verify the Token if Valid and not expired.
			$wp_session_tokens = WP_Session_Tokens::get_instance($user_id);
			if( is_null($wp_session_tokens->get( $session_token )) ) {
				return rest_ensure_response( 
					array(
						"status" => "failed",
						"message" => "Please contact your administrator. Token Not Found!"
					)
				);
			} else {
				if( time() >= $wp_session_tokens->get( $session_token )['expiration'] )   {
					return rest_ensure_response( 
						array(
							"status" => "failed",
							"message" => "Please contact your administrator. Token Expired!"
						)
					);
				}
			}

			$wp_user = get_user_by("ID", $user_id);

			if( $wp_user != false ) {
				// STEP 3 - Return a success and complete object. //$wp_user->data->user_activation_key
				return rest_ensure_response( 
					array(
						"status" => "success",
						"user" => array(
							"uname" => $wp_user->data->user_nicename,
							"dname" => $wp_user->data->display_name
						)
					)
				);
			} else {
				return rest_ensure_response( 
					array(
						"status" => "failed",
						"message" => "Please contact your administrator. User Not Found!"
					)
				);
			}

		}
	}

?>