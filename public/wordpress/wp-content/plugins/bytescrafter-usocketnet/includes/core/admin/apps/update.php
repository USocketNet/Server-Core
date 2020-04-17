
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

    add_action('wp_ajax_UpdateThisApp', 'UpdateThisApp');
    add_action('wp_ajax_nopriv_UpdateThisApp', 'UpdateThisApp');
    function UpdateThisApp() 
    { 
        if( !isset($_POST['appid_edit']) || !isset($_POST['appname_edit'])  || !isset($_POST['appdesc_edit']) || !isset($_POST['appurl_edit']) || !isset($_POST['appsta_edit']) || !isset($_POST['appcap_edit']))
        {
            echo json_encode( 
                array(
                    'status'=>'danger', 
                    'message'=>'All inputs is required and neccesary for application to be updated.'
                ) 
            );
            wp_die();
        }

        $appid = $_POST['appid_edit'];
        $appname = $_POST['appname_edit'];
        $appdesc = $_POST['appdesc_edit'];
        $appurl = $_POST['appurl_edit'];
        $appsta = $_POST['appsta_edit'];
        $appcap = $_POST['appcap_edit'];

        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_APPTAB;

        $rows = $wpdb->get_results( "UPDATE $appsTable SET aname = '$appname', ainfo = '$appdesc', aurl = '$appurl', asta = '$appsta', acap = '$appcap' 
            WHERE aid = '$appid'" );

        if( $rows !== FALSE ) {
            echo json_encode( array('message'=>'The application has been updated successfully.') );
        } else {
            echo json_encode( array('message'=>'There was a problem on updating this application.') );
        }

        wp_die();
    }

?>