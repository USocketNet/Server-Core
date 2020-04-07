
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

    add_action('wp_ajax_DeleteThisApp', 'DeleteThisApp');
    add_action('wp_ajax_nopriv_DeleteThisApp', 'DeleteThisApp');
    function DeleteThisApp() 
    { 
        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_PREFIX . '_' . 'apps';

        if( !isset($_POST['appid_edit']) )
        {
            echo json_encode( array('message'=>'Application id is required during app deletion, contact your administrator.') );
            wp_die();
        }

        $rows = $wpdb->get_results( "DELETE FROM $appsTable WHERE aid = ".$_POST['appid_edit']);

        if( $rows !== FALSE ) {
            echo json_encode( array('message'=>'The application has been removed successfully.') );
        } else {
            echo json_encode( array('message'=>'There was a problem on deleting this application.') );
        }

        wp_die();
    }

?>