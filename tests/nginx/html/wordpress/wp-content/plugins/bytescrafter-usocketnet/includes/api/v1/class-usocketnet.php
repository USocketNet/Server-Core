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
	class BC_USocketNet {

		public static function bc_usn_verify_token() {

			// Check that we're trying to authenticate
			if (!isset($_POST["wpid"]) || !isset($_POST["snid"]) || !isset($_POST["apid"])) {
				return rest_ensure_response( 
					array(
						"status" => "unknown",
						"message" => "Please contact your administrator. Verification Unknown!",
					)
				);
			}

			//Listen for this POST parameters push by client.
			$user_id = $_POST["wpid"];
			$session_token = $_POST["snid"];
			$app_id = $_POST["apid"];

			//Check app is active and have capacity avail.
			
	
			//Grab WP_Session_Token from wordpress.
			$wp_session_token = WP_Session_Tokens::get_instance($user_id);
		
			if( $wp_session_token->verify( $session_token ) ) {
				$wp_session = $wp_session_token->get( $session_token );
				if( $wp_session['expiration'] >= time() ) {
	
					//Feed $user_data object with the user data need.
					$wp_user = get_user_by('id', $user_id);

					return rest_ensure_response( 
						array(
							"status" => "success",
							"wpid" => $user_id,
							"uname" => $wp_user->data->user_nicename,
							"dname" => $wp_user->data->display_name,
							"email" => $wp_user->data->user_email,
							"roles" => $wp_user->roles,
							"session" => $session_token,
							"regdate" => $wp_user->data->user_registered
						)
					);
				}
			}
	
			return rest_ensure_response( 
				array(
					"status" => "failed",
					"message" => "Please contact your administrator. Verification Failed!",
				)
			);
		}
	}

?>