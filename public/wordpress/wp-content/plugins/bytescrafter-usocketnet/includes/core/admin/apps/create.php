
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

    add_action('wp_ajax_CreateNewApp', 'CreateNewApp');
    add_action('wp_ajax_nopriv_CreateNewApp', 'CreateNewApp');
    function CreateNewApp() 
    { 
        if( !isset($_POST['appname_create']) || !isset($_POST['appdesc_create']) || !isset($_POST['appurl_create']) || !isset($_POST['appsta_create']) || !isset($_POST['appcap_create']) )
        {
            echo json_encode( 
                array(
                    'status'=>'danger',
                    'message'=>'All inputs is required and neccesary for application to be created.'
                ) 
            );
            wp_die();
        }

        $appname = $_POST['appname_create'];
        $appdesc = $_POST['appdesc_create'];
        $appurl = $_POST['appurl_create'];
        $appsta = $_POST['appsta_create'];
        $appcap = $_POST['appcap_create'];

        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_APPTAB;

        $appCheck = $wpdb->get_results("SELECT app_owner, wp_users.user_login FROM $appsTable, wp_users WHERE app_name = '$appname'");

        if( count($appCheck) >= 1 )
        {
            echo json_encode( 
                array( 
                    'status'=>'danger',
                    'message'=>'Name of the application already exist owned by: ' . $appCheck[0]->user_login
                ) 
            );
            wp_die();
        }

        $generatedKey = wp_hash( wp_get_current_user()->ID . date("Y-m-d H:i:s u") );
        $data_array = array(
            'app_owner' => wp_get_current_user()->ID,
            'app_secret' => $generatedKey,
            'app_status' => $appsta,
            'app_name' => $appname,
            'app_info' => $appdesc,
            'app_website' => $appurl,
            'max_connect' => $appcap,
        );
        $result = $wpdb->insert($appsTable, $data_array, $format=NULL);

        if( $result !== FALSE ) {
            echo json_encode( 
                array(
                    'status'=>'success',
                    'message'=>'The application has been added successfully with appkey of: '.$generatedKey
                ) 
            );
        } else {
            echo json_encode( 
                array(
                    'status'=>'danger',
                    'message'=>'There was a problem on saving this application. Try different value for the name.'
                ) 
            );
        }

        wp_die();
    }

?>