
<?php

//Require the USocketNet class which have the core function of this plguin. 

require plugin_dir_path(__FILE__) . '/class-wordpress.php';
require plugin_dir_path(__FILE__) . '/class-usocketnet.php';

include_once( plugin_dir_path( __FILE__ ) . '/auth-callback.php' );

//require plugin_dir_path(__FILE__) . '/class-demoguy.php';
include_once( plugin_dir_path( __FILE__ ) . '/demo-callback.php' );

// Init check if USocketNet successfully request from wapi.
function bytescrafter_usocketnet_route()
{
    // register_rest_route( 'usocketnet/v1', 'demo', array(
    //     'methods' => 'POST',
    //     'callback' => array('BC_Demoguy','init'),
    // ));

    register_rest_route( 'usocketnet/v1', 'auth', array(
        'methods' => 'POST',
        'callback' => array('BC_USocketNet_WP','bc_usn_authenticate'),
    ));

    register_rest_route( 'usocketnet/v1', 'token', array(
        'methods' => 'POST',
        'callback' => array('BC_USocketNet','bc_usn_verify_token'),
    ));
}
add_action( 'rest_api_init', 'bytescrafter_usocketnet_route' );

?>