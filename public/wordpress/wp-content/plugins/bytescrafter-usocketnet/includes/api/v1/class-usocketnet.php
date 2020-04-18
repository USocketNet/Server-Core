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

			// STEP 1: Check if WPID and SNID is passed as this is REQUIRED!
			if (!isset($_POST["wpid"]) || !isset($_POST["snid"]) || !isset($_POST["apid"]) ) {
				return rest_ensure_response( 
					array(
						"status" => "unknown",
						"message" => "Please contact your administrator. Verification Unknown!",
					)
				);
			}
			$user_id = $_POST["wpid"];
			$session_token = $_POST["snid"];
			$app_id = $_POST["apid"];

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

			// STEP 3 - Override if server is asking for status. TEMP!
			$wp_user = get_user_by('id', $user_id);
			if(array_values($wp_user->roles)[0] == 'administrator' && $app_id == 'svr-status') {
				return rest_ensure_response( 
					array(
						"status" => "success",
						"user" => array(
							"wpid" => $user_id,
							"uname" => $wp_user->data->user_nicename,
							"dname" => $wp_user->data->display_name,
							"email" => $wp_user->data->user_email,
							"roles" => $wp_user->roles,
							"session" => $session_token,
							"regdate" => $wp_user->data->user_registered
						)
					)
				);
			}

			// STEP 4 - Verify the AppKey Secret if valid.
			global $wpdb; 
			$appsTable = USN_APPTAB;
			$checkName = $wpdb->get_results("SELECT api, asta, aname, ainfo, aurl, acap FROM $appsTable WHERE api = '$app_id'");

			if( count($checkName) >= 1 ) {
				if( $checkName[0]->asta == "Active" ) {

					return rest_ensure_response( 
						array(
							"status" => "success",
							"app" => array(
								"name" => $checkName[0]->aname,
								"desc" => $checkName[0]->ainfo,
								"url" => $checkName[0]->aurl,
								"cap" => $checkName[0]->acap,
							),
							"user" => array(
								"wpid" => $user_id,
								"uname" => $wp_user->data->user_nicename,
								"dname" => $wp_user->data->display_name,
								"email" => $wp_user->data->user_email,
								"roles" => $wp_user->roles,
								"session" => $session_token,
								"regdate" => $wp_user->data->user_registered
							)
						)
					);

				} else {
					return rest_ensure_response( 
						array(
							"status" => "inactive",
							"message" => "Please contact your administrator. Inactive App!",
						)
					);
				}				
			} else {
				return rest_ensure_response( 
					array(
						"status" => "unknown",
						"message" => "Please contact your administrator. AppSecret Incorrect!",
					)
				);
			}
		}
	}

?>