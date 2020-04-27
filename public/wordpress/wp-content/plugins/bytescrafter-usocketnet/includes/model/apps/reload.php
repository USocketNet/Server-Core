
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/**
	 * @package bytescsrafter-usocketnet
	*/
?>

<?php

    add_action('wp_ajax_ReloadApps', 'ReloadApps');
    add_action('wp_ajax_nopriv_ReloadApps', 'ReloadApps');
    function ReloadApps() 
    { 
        global $wpdb;
        $appsTable = USN_APPTAB;

        //SELECT ALL ENTRY on bc_apps
        $appList = $wpdb->get_results( "SELECT bc_usn_apps.ID, app_owner, app_secret, app_status, app_name, app_info, app_website, max_connect, date_created, wp_users.user_login FROM $appsTable, wp_users WHERE wp_users.ID = app_owner");

        if( $appList !== FALSE ) {
            echo json_encode( array( 'status'=>'success', 'message'=> $appList ) );
        } else {
            echo json_encode( array('status'=>'failed', 'message'=>'There was a problem on loading applications.') );
        }

        wp_die();
    }

?>