
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
                    $sql .= "`aid` bigint(20) NOT NULL AUTO_INCREMENT, ";
                    $sql .= "`api` varchar(49) NOT NULL, ";
                    $sql .= "`uid` bigint(20) NOT NULL, ";
                    $sql .= "`asta` enum('Active','Inactive') NOT NULL DEFAULT 'Active', ";
                    $sql .= "`aname` varchar(120) NOT NULL, ";
                    $sql .= "`ainfo` varchar(255) NOT NULL, ";
                    $sql .= "`aurl` varchar(255) NOT NULL, ";
                    $sql .= "`acap` int(4) NOT NULL DEFAULT '1000', ";
                    $sql .= "`regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, ";
                    $sql .= "PRIMARY KEY (`aid`), ";
                    $sql .= "UNIQUE  (`aname`) ";
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