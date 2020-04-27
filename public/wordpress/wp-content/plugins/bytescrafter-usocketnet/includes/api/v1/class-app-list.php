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
	class BC_USN_AppList {

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

			// STEP 3 - Verify the AppKey Secret if valid.
			global $wpdb; 
			$appsTable = USN_APPTAB;
			$checkName = $wpdb->get_results("SELECT api, asta, aname, ainfo, aurl, acap FROM $appsTable");

			if( count($checkName) >= 1 ) {
				$applist = array();
				foreach($checkName as $app) {
					if( $app->asta == "Active" ) { } 
					$applist[] = $app;
				}
				return rest_ensure_response( 
					array(
						"status" => "success",
						"apps" => $applist,
					)
				);
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