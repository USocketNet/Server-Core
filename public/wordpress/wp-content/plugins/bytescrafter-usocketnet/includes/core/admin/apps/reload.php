
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
        $appsTable = USN_PREFIX . '_' . 'apps';

        //SELECT ALL ENTRY on bc_apps
        $rows = $wpdb->get_results( "SELECT aid, uid, api, asta, aname, ainfo, aurl, acap, regdate, wp_users.user_login 
            FROM $appsTable, wp_users WHERE wp_users.ID = uid");

        if( $rows !== FALSE ) {
            echo json_encode( array( 'status'=>'success', 'message'=>$rows ) );
        } else {
            echo json_encode( array('status'=>'failed', 'message'=>'There was a problem on loading applications.') );
        }

        wp_die();
    }

?>