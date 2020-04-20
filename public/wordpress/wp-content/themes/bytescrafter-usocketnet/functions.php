

<?php
	/**
	 * Basically, all the logic happens here.
	 *
	 * @package bytescrafter-usocketnet
	 * @since 0.1.0
	 */
?>

<?php

    function usn_plugin_frontend_enqueue()
    {    
        wp_enqueue_style('usn_google_fonts', 
            'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700',
            false
        );

        wp_enqueue_style('usn_bootstrap_css', 
            get_template_directory_uri() . '/assets/bootstrap/css/bootstrap.min.css', 
            array(), 
            false
        );

        wp_enqueue_style('usn_fontawesome_css', 
            get_template_directory_uri() . '/assets/font-awesome/css/font-awesome.min.css', 
            array(), 
            false
        );

        wp_enqueue_style('usn_animate_css', 
            get_template_directory_uri() . '/assets/css/animate.css', 
            array(), 
            false
        );

        wp_enqueue_style('usn_magnific_css', 
            get_template_directory_uri() . '/assets/css/magnific-popup.css', 
            array(), 
            false
        );

        wp_enqueue_style('usn_style_css', 
            get_template_directory_uri() . '/assets/css/style.css', 
            array(), 
            false
        );

        wp_enqueue_style('usn_responsive_css', 
            get_template_directory_uri() . '/assets/css/responsive.css', 
            array(), 
            false
        );

        wp_enqueue_script('usn_jquery_js', get_template_directory_uri() . '/assets/jquery/jquery.js', array(),'1.11.1', false);
        wp_enqueue_script('usn_bootstrap_js', get_template_directory_uri() . '/assets/bootstrap/js/bootstrap.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_jqstellar_js', get_template_directory_uri() . '/assets/jquery/jquery.stellar.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_jqsticky_js', get_template_directory_uri() . '/assets/jquery/jquery.sticky.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_jqwow_js', get_template_directory_uri() . '/assets/jquery/wow.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_jqcounto_js', get_template_directory_uri() . '/assets/jquery/jquery.countTo.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_inview_js', get_template_directory_uri() . '/assets/jquery/jquery.inview.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_easypie_js', get_template_directory_uri() . '/assets/jquery/jquery.easypiechart.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_shuffle_js', get_template_directory_uri() . '/assets/jquery/jquery.shuffle.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_magnific_js', get_template_directory_uri() . '/assets/jquery/jquery.magnific-popup.min.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_fitvids_js', get_template_directory_uri() . '/assets/jquery/jquery.fitvids.js', array(),'3.3.2', false);
        wp_enqueue_script('usn_script_js', get_template_directory_uri() . '/assets/jquery/theme.js', array(),'3.3.2', false);
        // wp_enqueue_script('usn_googlemap_js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhQl6ptglWbMEG1qzoateEXcA4oPHSCSk&callback=initMaps', array(),'3.3.2', false);
    }
    add_action( 'wp_head', 'usn_plugin_frontend_enqueue' );

    function usocketnet_head_meta() {
        ?>
            <!-- <link rel="shortcut icon" href="<?php //echo get_template_directory_uri(); ?>assets/images/ico/favicon.png"> -->
        <?php
    }
    add_action('wp_head', 'usocketnet_head_meta');

    // Get the navigation list here.
    function usocketnet_get_main_menu() {
        $menu_list = "";
        $menu_items = wp_get_nav_menu_items( 'main-menu' );
        foreach( $menu_items as $item ) {
            if($item->menu_item_parent == 0) {
                echo "<li><a href='".$item->url."'>".$item->title."</a></li>";
            } {
                //$parentMenu = get_post($item->ID);
                //echo "<li><a href='".$item->url."'>".$item->title."</a></li>";
            }
            //echo $item->menu_item_parent;
        }
    }

    // Get the breadcrumbs list to <li>.
    function get_breadcrumbs() {   
        // Start the breadcrumb with a link to your homepage 
        echo '<div class="breadcrumbs"> <a href="'.get_option('home').'">'.'Home'.'</a>'.' > ';

        // Check if the current page is a category, an archive or a single page. If so show the category or archive name.
        if (is_category() || is_single() ){
            the_category('title_li=');
        } elseif (is_archive() || is_single()){
            if ( is_day() ) {
                printf( __( '%s', 'text_domain' ), get_the_date() );
            } elseif ( is_month() ) {
                printf( __( '%s', 'text_domain' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'text_domain' ) ) );
            } elseif ( is_year() ) {
                printf( __( '%s', 'text_domain' ), get_the_date( _x( 'Y', 'yearly archives date format', 'text_domain' ) ) );
            } else {
                _e( 'Blog Archives', 'text_domain' );
            }
        }
        
        // If the current page is a single post, show its title with the separator
        if (is_single()) {
            echo ' > ';
            the_title();
        }
        
        // If the current page is a static page, show its title.
        if (is_page()) {
            echo the_title();
        }

        echo '</div>';
    }

    function hook_javascript() {
        ?>
            <script>
                console.log('Function has been called!');
            </script>
        <?php
    }
    add_action('wp_head', 'hook_javascript');
