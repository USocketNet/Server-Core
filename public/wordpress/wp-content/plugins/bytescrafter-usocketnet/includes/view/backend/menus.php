
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

    #region Initilized new admin menu for this plugin including submenus.
        function usocketnet_init_admin_menu() 
        {
            // Add new menu to the admin page.
            add_menu_page('USocketNet', 'USocketNet', 'manage_options', 'usocketnet-getting_started', 
                'usocketnet_gettingstarted_page_callback', plugin_dir_url( __FILE__ ).'../../../icon.png', 4 );

            add_submenu_page('usocketnet-getting_started', 'USN Getting Started', 'Getting Started', 
                'manage_options', 'usocketnet-getting_started' );

            add_submenu_page('usocketnet-getting_started', 'USN Online Users', 'Online Users',
               'manage_options', 'usocketnet-online_users', 'usocketnet_onlineusers_page_callback' );

            add_submenu_page('usocketnet-getting_started', 'USN Active Channels', 'Active Channels',
               'manage_options', 'usocketnet-active_channels', 'usocketnet_activechannels_page_callback' );

            add_submenu_page('usocketnet-getting_started', 'USN Applications', 'Applications',
                'manage_options', 'usocketnet-applications', 'usocketnet_applications_page_callback' );

            add_submenu_page('usocketnet-getting_started', 'USN Server Instance', 'Server Instance',
              'manage_options', 'usocketnet-server_instance', 'usocketnet_serverinstance_page_callback' );

            add_submenu_page('usocketnet-getting_started', 'USN Settings', 'Settings',
               'manage_options', 'usocketnet-settings', 'usocketnet_setting_page_callback' );
        }
        add_action('admin_menu', 'usocketnet_init_admin_menu');

        function usocketnet_gettingstarted_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/getting-started.php' );
        }

        function usocketnet_onlineusers_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/online-users.php' );
        }

        function usocketnet_activechannels_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/active-channels.php' );
        }

        function usocketnet_applications_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/applications.php' );
        }

        function usocketnet_serverinstance_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/server-instance.php' );
        }

        function usocketnet_setting_page_callback()
        {
            include_once( plugin_dir_path( __FILE__ ) . '/menus/settings.php' );
        }
    #endregion
?>