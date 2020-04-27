<?php

    /*
        Plugin Name: USocketNet Backend
        Plugin URI: http://www.bytescrafter.net/projects/usocketnet
        Description: USocketNet backend using the WordPress framework.
        Version: 0.2.0
        Author: Bytes Crafter
        Author URI:   https://www.bytescrafter.net/about-us
        Text Domain:  bytescrafter-usocketnet-backend
        
        * @package      bytescrafter-usocketnet-backend
        * @author       Bytes Crafter

        * @copyright    2020 Bytes Crafter
        * @version      0.2.0

        * @wordpress-plugin
        * WC requires at least: 2.5.0
        * WC tested up to: 5.4
    */

    #region WP Recommendation - Prevent direct initilization of the plugin.
        if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly
        if ( ! function_exists( 'is_plugin_active' ) ) 
        {
            require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        }
    #endregion

    include_once ( plugin_dir_path( __FILE__ ) . '/config.php' );
    include_once ( plugin_dir_path( __FILE__ ) . '/update.php' );

    //Make sure to create required mysql tables.
    include_once ( plugin_dir_path( __FILE__ ) . '/includes/core/hook.php' );

    #region Include assets like scripts, styles, etc.
        $checkUSNget = isset($_GET['page']);
        $checkUSNarr = array(
            'usocketnet-getting_started',
            'usocketnet-online_users',
            'usocketnet-settings',
            'usocketnet-active_channels',
            'usocketnet-applications',
            'usocketnet-server_instance',
        );
        if( $checkUSNget && in_array($_GET['page'], $checkUSNarr) )
        {
            function usn_plugin_admin_enqueue()
            {    
                wp_enqueue_script( 'usn_popper_script', plugin_dir_url( __FILE__ ) . 'assets/popper/popper.min.js' ); 
                wp_enqueue_script( 'usn_clipboard_script', plugin_dir_url( __FILE__ ) . 'assets/clipboard/clipboard.min.js' );    
                wp_enqueue_script( 'usn_chartjs_script', plugin_dir_url( __FILE__ ) . 'assets/chartjs/chart.min.js' );
                
                wp_enqueue_style( 'usn_bootstrap_style', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css' );
                wp_enqueue_script( 'usn_bootstrap_script', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.min.js' );

                wp_enqueue_style( 'usn_datatables_style', plugin_dir_url( __FILE__ ) . 'assets/datatables/datatables.min.css' );
                wp_enqueue_script( 'usn_datatables_script', plugin_dir_url( __FILE__ ) . 'assets/datatables/datatables.min.js' );

                wp_enqueue_style( 'usn_jqueryui_style', plugin_dir_url( __FILE__ ) . 'assets/jquery-ui/jquery-ui.min.css' );
                wp_enqueue_script( 'usn_jqueryui_script', plugin_dir_url( __FILE__ ) . 'assets/jquery-ui/jquery-ui.min.js' );

                wp_enqueue_script( 'usn_socketio_script', plugin_dir_url( __FILE__ ) . 'assets/usocketnet/socket.io.js' ); 
                wp_enqueue_script( 'usn_core_script', plugin_dir_url( __FILE__ ) . 'assets/usocketnet/usocketnet.js' ); 

                wp_enqueue_style( 'usn_admin_style', plugin_dir_url( __FILE__ ) . 'assets/custom/styles.css' );
                wp_enqueue_script( 'usn_admin_script', plugin_dir_url( __FILE__ ) . 'assets/usocketnet/backend.js', array('jquery'), '1.0', true );
                wp_localize_script( 'usn_admin_script', 'ajaxurl', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
            }
            add_action( 'admin_enqueue_scripts', 'usn_plugin_admin_enqueue' );
        }
    #endregion

    //Include the REST API of USocketNet to be accessible.
    include_once ( plugin_dir_path( __FILE__ ) . '/includes/api/index.php' );

    //Display menu on WP Backend.
    include_once ( plugin_dir_path( __FILE__ ) . '/includes/view/backend/menus.php' );

	//AJAX LISTENER for Apps
	include_once ( plugin_dir_path( __FILE__ ) . '/includes/model/apps/reload.php' );
	include_once ( plugin_dir_path( __FILE__ ) . '/includes/model/apps/create.php' );
	include_once ( plugin_dir_path( __FILE__ ) . '/includes/model/apps/update.php' );
	include_once ( plugin_dir_path( __FILE__ ) . '/includes/model/apps/delete.php' );
?>