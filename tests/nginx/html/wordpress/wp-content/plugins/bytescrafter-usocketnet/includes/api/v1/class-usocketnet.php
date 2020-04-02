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
			//Listen for this POST parameters push by client.
			$user_id = $_POST["wpid"];
			$session_token = $_POST["snid"];
	
			//Grab WP_Session_Token from wordpress.
			$wp_session_token = WP_Session_Tokens::get_instance($user_id);
	
			$user_data = [];
	
			if( $wp_session_token->verify( $session_token ) ) {
				$wp_session = $wp_session_token->get( $session_token );
				if( $wp_session['expiration'] >= time() ) {
	
					//Feed $user_data object with the user data need.
					$wp_user = get_user_by('id', $user_id);

					return rest_ensure_response( 
						array(
							"status" => "success",
							"uname" => $wp_user->data->user_nicename,
							"dname" => $wp_user->data->display_name,
							"email" => $wp_user->data->user_email,
							"roles" => $wp_user->roles,
							"session" => $session_token,
							"regdate" => $wp_user->data->user_registered
						)
					);

					//Return a with primary key, status[error, success].
					return rest_ensure_response( $user_data );
				}
			}
	
			//Our client primary status report as failed.
			$user_data["status"] = "failed";
	
			return rest_ensure_response( $user_data );
		}
	}

?>