
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) 
	{
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
        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_TABLE_PREFIX . '_' . 'apps';

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

    // WordPress Ajax for handling app creation.
    add_action('wp_ajax_CreateNewApp', 'CreateNewApp');
    add_action('wp_ajax_nopriv_CreateNewApp', 'CreateNewApp');
    function CreateNewApp() 
    { 
        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_TABLE_PREFIX . '_' . 'apps';

        $appname = $_POST['appname_create'];
        $appdesc = $_POST['appdesc_create'];
        $appurl = $_POST['appurl_create'];
        $appsta = $_POST['appsta_create'];
        $appcap = $_POST['appcap_create'];

        if( !isset($appname) || !isset($appdesc) || !isset($appurl) || !isset($appsta) || !isset($appcap) )
        {
            echo json_encode( 
                array(
                    'status'=>'danger',
                    'message'=>'All inputs is required and neccesary for application to be created.'
                ) 
            );
            wp_die();
        }

        $checkName = $wpdb->get_results("SELECT uid, wp_users.user_login FROM $appsTable, wp_users 
            WHERE aname = '$appname' AND wp_users.ID = uid");

        if( count($checkName) >= 1 )
        {
            echo json_encode( 
                array( 
                    'status'=>'danger',
                    'message'=>'Name of the application already exist owned by: ' . $checkName[0]->user_login
                ) 
            );
            wp_die();
        }

        $generatedKey = wp_hash( wp_get_current_user()->ID . date("Y-m-d H:i:s u") );
        $data_array = array(
            'uid' => wp_get_current_user()->ID,
            'api' => $generatedKey,
            'asta' => $appsta,
            'aname' => $appname,
            'ainfo' => $appdesc,
            'aurl' => $appurl,
            'acap' => $appcap,
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

    // WordPress Ajax for handling app deletion.
    add_action('wp_ajax_DeleteThisApp', 'DeleteThisApp');
    add_action('wp_ajax_nopriv_DeleteThisApp', 'DeleteThisApp');
    function DeleteThisApp() 
    { 
        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_TABLE_PREFIX . '_' . 'apps';

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

    // WordPress Ajax for handling app deletion.
    add_action('wp_ajax_UpdateThisApp', 'UpdateThisApp');
    add_action('wp_ajax_nopriv_UpdateThisApp', 'UpdateThisApp');
    function UpdateThisApp() 
    { 
        global $wpdb; //Reference to wp mysql conn.
        $appsTable = USN_TABLE_PREFIX . '_' . 'apps';

        $appid = $_POST['appid_edit'];
        $appname = $_POST['appname_edit'];
        $appdesc = $_POST['appdesc_edit'];
        $appurl = $_POST['appurl_edit'];
        $appsta = $_POST['appsta_edit'];
        $appcap = $_POST['appcap_edit'];

        if( !isset($appid) || !isset($appname) || !isset($appdesc) || !isset($appurl) || !isset($appsta) || !isset($appcap) )
        {
            echo json_encode( array('message'=>'All inputs is required and neccesary for application to be updated.') );
            wp_die();
        }

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