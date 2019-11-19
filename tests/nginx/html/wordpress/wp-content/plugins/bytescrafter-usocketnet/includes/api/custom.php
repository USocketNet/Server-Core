
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
    
    // Init check if USocketNet successfully request from wapi.
    function bytescrafter_usocketnet_route() //prev: init_register_route
    {
        register_rest_route( 'usocketnet', 'init', array(
                'methods' => 'GET',
                'callback' => function () {
                    $cur_usr = wp_get_current_user();
                    $data = [
                        'uid'   => (int)    $cur_usr->ID,
                        'admin' => (bool)   current_user_can( 'administrator' ),
                        'name'  => (string) $cur_usr->display_name
                    ];
                    return rest_ensure_response( $data );
                },
                'permission_callback' => function() {
                    return current_user_can( 'administrator' );
                },
            )
        );

        register_rest_route( 'usocketnet', 'auth', array(
                'methods' => 'GET',
                'callback' => function () {
                    global $wpdb;
                    $appsTable = USN_TABLE_PREFIX . '_' . 'apps';
                    $appkey = $_GET['appid'];
                    $getapp = $wpdb->get_results("SELECT aid, acap, asta FROM $appsTable WHERE api = '$appkey'");
                    
                    $checkApp = 'app_notfound';
                    if( count($getapp) > 0 )
                    {
                        if( $getapp[0]->asta == 'Active' )
                        {
                            $checkApp = 'app_ready';
                        }

                        else 
                        {
                            $checkApp = 'app_inactive';
                        }
                    }

                    $cur_usr = wp_get_current_user();
                    $data = [];

                    if( $checkApp == 'app_ready' ) { 
                        $data['uid'] = $cur_usr->ID;
                        $data['name'] = $cur_usr->display_name;
                        $data['aid'] = $getapp[0]->aid;
                        $data['acap'] = $getapp[0]->acap;
                        $data['status'] = 'success';
                    } else {
                        $data['code'] = $checkApp;
                        $data['status'] = 'failed';
                    }
                    return rest_ensure_response( $data );
                },
                'permission_callback' => function() {
                    return current_user_can( 'subscriber' );
                },
            )
        );
    }
    add_action( 'rest_api_init', 'bytescrafter_usocketnet_route' );
?>