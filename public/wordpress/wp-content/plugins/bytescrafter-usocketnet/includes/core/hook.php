
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) 
	{
		exit;
	}

	/**
	 * @package bytescrafter-usocketnet
	*/
?>

<?php

    function usocketnet_activate() {
        global $wpdb;

        // #region CREATING TABLE FOR APPS
            $usn_app_tab = USN_APPTAB;
            if($wpdb->get_var( "SHOW TABLES LIKE '$usn_app_tab'" ) != $usn_app_tab) {
                $sql = "CREATE TABLE `".$usn_app_tab."` (";
                    $sql .= "`ID` bigint(20) NOT NULL AUTO_INCREMENT, ";
                    $sql .= "`app_secret` varchar(49) NOT NULL, ";
                    $sql .= "`app_owner` bigint(20) NOT NULL, ";
                    $sql .= "`app_status` enum('Active','Inactive') NOT NULL DEFAULT 'Active', ";
                    $sql .= "`app_name` varchar(120) NOT NULL, ";
                    $sql .= "`app_info` varchar(255) NOT NULL, ";
                    $sql .= "`app_website` varchar(255) NOT NULL, ";
                    $sql .= "`max_connect` int(4) NOT NULL DEFAULT '1000', ";
                    $sql .= "`date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, ";
                    $sql .= "PRIMARY KEY (`ID`), ";
                    $sql .= "UNIQUE  (`app_name`) ";
                    $sql .= ") ENGINE = InnoDB; ";
                $result = $wpdb->get_results($sql);
                
            }
        // #endregion
    } 
    add_action( 'activated_plugin', 'usocketnet_activate' );

    /**
     * Deactivation hook.
     */
    function usocketnet_deactivate() {
        //echo "DEACTIVATED";
    }
    register_deactivation_hook( __FILE__, 'usocketnet_deactivate' );

?>