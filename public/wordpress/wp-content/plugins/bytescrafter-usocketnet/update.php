<?php
    /**
     * How to integrate WordPress Core updates with your custom Plugin or Theme
     * 
     * Filter the `update_plugins` transient to report your plugin as out of date.
     * Themes have a similar transient you can filter.
     * 
     */
    add_filter( 'site_transient_update_plugins', 'usocketnet_extend_filter_update_plugins' );
    add_filter( 'transient_update_plugins', 'usocketnet_extend_filter_update_plugins' );
    function usocketnet_extend_filter_update_plugins( $update_plugins ) {

        if ( ! is_object( $update_plugins ) )
                return $update_plugins;

        if ( ! isset( $update_plugins->response ) || ! is_array( $update_plugins->response ) )
            $update_plugins->response = array();

        //Prepare container for data of server query.
        $response = array();
        
        //verify licence to server, return status, new_version, url, package. status=failed else.
        if(true) {
            // This array must come from server.
            $response = array(
                'status'       => 'success',
                'slug'         => 'bytescrafter-usocketnet', // Whatever you want, as long as it's not on WordPress.org
                'new_version'  => '1.0.0', // The newest version and must be greater.
                'url'          => 'https://usocketnet.bytescrafter.net/', // Informational
                'package'      => 'https://usocketnet.bytescrafter.ne/bytescrafter-usocketnet.zip', //File url or expiring url with this host.
            );
        }

        if( !empty($response) ) {
            if( $response['status'] == "success" ) {
                $update_plugins->response['bytescrafter-usocketnet/index.php'] = (object)$response;
            }
        }

        return $update_plugins;
    }
?>