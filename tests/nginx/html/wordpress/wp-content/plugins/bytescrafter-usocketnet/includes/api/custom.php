
<?php
	// Exit if accessed directly
	if ( ! defined( "ABSPATH" ) ) 
	{
		exit;
	}

	/**
	 * @package bytescsrafter-usocketnet
	*/
?>

<?php
    
    // HOW TO: http://~host:port/~/wp-json/usocketnet/v1/auth
    // Body Type Content: x-www-form-urlencoded

    //Get the user session token string and if nothing, create and return one.
    function get_user_session_data( $user_id ) {
        $session_now = [];

        //Get the array of all browser session in any methods.
        $session_now = get_user_meta($user_id, "session_tokens", true);

        if (!is_array($session_now)) {
            wp_set_auth_cookie( $user_id );
            $session_now = get_user_meta($user_id, "session_tokens", true);
            $session_now = array_keys($session_now)[count($session_now)-1];
            return $session_now;
        }
        
        $session_now = array_keys($session_now)[count($session_now)-1];
        return $session_now;
    }

    //Initially authenticate the user and get SESSION STRING for future automatic sign in.
    function bytescrafter_usocketnet_api_auth() {
        //Catch ff. parameters from client for authentication.
        $uname = $_POST["uname"];
        $pword = $_POST["pword"];

        //Catch user information of the current auth if success.
        $auth = wp_authenticate( $uname, $pword );
        
        //Create an object which will be converted to json upon sending to client.
        $returnee = [];

        if( $auth->errors ) {
            //Return a authentication error.
            $returnee["status"] = "error";
        } else {
            //Return a authentication success with user related data.
            $returnee["status"] = "success";

            //Preparing data which to be return to user.
            $returnee["uid"] = $auth->ID;
            $returnee["uname"] = $auth->data->user_nicename;
            $returnee["dname"] = $auth->data->display_name;
            $returnee["email"] = $auth->data->user_email;
            $returnee["roles"] = $auth->roles;
            $returnee["session"] = get_user_session_data($auth->ID);
            $returnee["regdate"] = $auth->data->user_registered;
        }

        //Return a with primary key, status[error, success].
        return rest_ensure_response( $returnee );
    }

    //If user has a token and user id, authenticate using it.
    function bytescrafter_usocketnet_api_auth_token() {
        //Listen for this POST parameters push by client.
        $user_id = $_POST["wpid"];
        $session_token = $_POST["snid"];

        //Get the array of all browser session in any methods.
        $session_now = get_user_meta($user_id, "session_tokens", true);

        //Initialzied user object to be return to client.
        $user_data = [];

        if (!is_array($session_now)) {
            $user_data["status"] = "expired";
        } else {
            if( array_key_exists($session_token, $session_now) ) {
                $user_data["status"] = "success";

                //Feed $user_data object with the user data need.
                $wp_user = get_user_by('id', $user_id);
                $user_data["uid"] = $user_id;
                $user_data["uname"] = $wp_user->data->user_nicename;
                $user_data["dname"] = $wp_user->data->display_name;
                $user_data["email"] = $wp_user->data->user_email;
                $user_data["roles"] = $wp_user->roles;
                $user_data["session"] = $session_token;
                $user_data["regdate"] = $wp_user->data->user_registered;

            } else {
                $user_data["status"] = "notfound";
            }
        }

        //Return a with primary key, status[error, success].
        return rest_ensure_response( $user_data );
    }

    // Init check if USocketNet successfully request from wapi.
    function bytescrafter_usocketnet_route() //prev: init_register_route
    {
        register_rest_route( "usocketnet/v1", "auth", array(
            "methods" => "POST",
            "callback" => "bytescrafter_usocketnet_api_auth",
        ));

        register_rest_route( "usocketnet/v1", "auth/token", array(
            "methods" => "POST",
            "callback" => "bytescrafter_usocketnet_api_auth_token",
        ));

        // register_rest_route( "usocketnet", "init", array(
        //         "methods" => "GET",
        //         "callback" => function () {
        //             $cur_usr = wp_get_current_user();
        //             $data = [
        //                 "uid"   => (int)    $cur_usr->ID,
        //                 "admin" => (bool)   current_user_can( "administrator" ),
        //                 "name"  => (string) $cur_usr->display_name
        //             ];
        //             return rest_ensure_response( $data );
        //         },
        //         "permission_callback" => function() {
        //             return current_user_can( "administrator" );
        //         },
        //     )
        // );

        // register_rest_route( "usocketnet", "auth", array(
        //         "methods" => "GET",
        //         "callback" => function () {

        //             global $wpdb;
        //             $appsTable = USN_TABLE_PREFIX . "_" . "apps";
        //             $appkey = $_GET["appid"];
        //             $getapp = $wpdb->get_results("SELECT aid, acap, asta FROM $appsTable WHERE api = "$appkey"");
                    
        //             $checkApp = "app_notfound";
        //             if( count($getapp) > 0 )
        //             {
        //                 if( $getapp[0]->asta == "Active" )
        //                 {
        //                     $checkApp = "app_ready";
        //                 }

        //                 else 
        //                 {
        //                     $checkApp = "app_inactive";
        //                 }
        //             }

        //             $cur_usr = wp_get_current_user();
        //             $data = [];

        //             if( $checkApp == "app_ready" ) { 
        //                 $data["uid"] = $cur_usr->ID;
        //                 $data["name"] = $cur_usr->display_name;
        //                 $data["aid"] = $getapp[0]->aid;
        //                 $data["acap"] = $getapp[0]->acap;
        //                 $data["status"] = "success";
        //             } else {
        //                 $data["code"] = $checkApp;
        //                 $data["status"] = "failed";
        //             }
        //             return rest_ensure_response( $data );
        //         },
        //         "permission_callback" => function() {
        //             return current_user_can( "subscriber" );
        //         },
        //     )
        // );
    }
    add_action( "rest_api_init", "bytescrafter_usocketnet_route" );
?>