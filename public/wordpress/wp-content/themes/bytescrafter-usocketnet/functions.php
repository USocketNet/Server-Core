
<?php
	/**
	 * Basically, all the logic happens here.
	 *
	 * @package hellopress
	 * @since 0.1.0
	 */

     #region WP Recommendation - Prevent direct initilization of the plugin.
        if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly
        if ( ! function_exists( 'is_plugin_active' ) ) 
        {
            require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        }
    #endregion
?>

<?php

    //Incclud theme core here.
    include_once( "core/index.php" );

    // Includes all our available shortcodes.
    include_once( "include/shortcodes.php" );

    //include post supports for formats.
    include_once( "include/override/postsupport.php" );

    //Theme customizer fields.
    include_once( "include/override/customizer.php" );

    //Include scripts that is needed js and css.
    function hwp_plugin_frontend_enqueue()
    {    
        wp_enqueue_style('hwp_google_fonts', 
            'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700',
            false
        );

        wp_enqueue_style('hwp_bootstrap_css', 
            get_template_directory_uri() . '/assets/bootstrap/css/bootstrap.min.css', 
            array(), 
            false
        );

        wp_enqueue_style('hwp_fontawesome_css', 
            get_template_directory_uri() . '/assets/font-awesome/css/font-awesome.min.css', 
            array(), 
            false
        );

        wp_enqueue_script('hwp_jquery_js', get_template_directory_uri() . '/assets/jquery/jquery.js', array(),'1.11.1', false);
        wp_enqueue_script('hwp_bootstrap_js', get_template_directory_uri() . '/assets/bootstrap/js/bootstrap.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_jqstellar_js', get_template_directory_uri() . '/assets/jquery/jquery.stellar.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_jqsticky_js', get_template_directory_uri() . '/assets/jquery/jquery.sticky.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_jqwow_js', get_template_directory_uri() . '/assets/jquery/wow.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_jqcounto_js', get_template_directory_uri() . '/assets/jquery/jquery.countTo.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_inview_js', get_template_directory_uri() . '/assets/jquery/jquery.inview.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_easypie_js', get_template_directory_uri() . '/assets/jquery/jquery.easypiechart.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_shuffle_js', get_template_directory_uri() . '/assets/jquery/jquery.shuffle.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_magnific_js', get_template_directory_uri() . '/assets/jquery/jquery.magnific-popup.min.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_fitvids_js', get_template_directory_uri() . '/assets/jquery/jquery.fitvids.js', array(),'3.3.2', false);
        wp_enqueue_script('hwp_script_js', get_template_directory_uri() . '/assets/jquery/theme.js', array(),'', false);
        wp_enqueue_style( "hwp_styles_css", get_stylesheet_uri() );
    }
    add_action( 'wp_head', 'hwp_plugin_frontend_enqueue' );

    // Get the navigation list here.
    function usocketnet_get_main_menu() {
        $menu_list = "";
        $menus = wp_get_nav_menu_items( 'primary' );
        if(!empty($menus)) {
            foreach( $menus as $item ) {
                if($item->menu_item_parent == 0) {
                    echo "<li><a href='".$item->url."'>".$item->title."</a></li>";
                } {
                    //$parentMenu = get_post($item->ID);
                    //echo "<li><a href='".$item->url."'>".$item->title."</a></li>";
                }
                //echo $item->menu_item_parent;
            }
        } else {
            echo "<li><a >CREATE A MENU</a></li>";
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

    // Sample hook for js or css.
    function hook_javascript() {
        ?>
            <script>
                console.log('Theme had been initialized!');
            </script>
        <?php
    }
    add_action('wp_head', 'hook_javascript');


    function wp_get_menu_array($current_menu) {

        $array_menu = wp_get_nav_menu_items($current_menu);
        $menu = array();
        if(is_array ($array_menu)) {
            foreach ($array_menu as $m) {
                if (empty($m->menu_item_parent)) {
                    $menu[$m->ID] = array();
                    $menu[$m->ID]['ID'] = $m->ID;
                    $menu[$m->ID]['title'] = $m->title;
                    $menu[$m->ID]['url'] = $m->url;
                    $menu[$m->ID]['children'] = array();
                }
            }
        }
        
        // $submenu = array();
        // foreach ($array_menu as $m) {
        //     if ($m->menu_item_parent) {
        //         $submenu[$m->ID] = array();
        //         $submenu[$m->ID]['ID'] = $m->ID;
        //         $submenu[$m->ID]['title'] = $m->title;
        //         $submenu[$m->ID]['url'] = $m->url;
        //         $menu[$m->menu_item_parent]['children'][$m->ID] = $submenu[$m->ID];
        //     }
        // }
        return $menu;
    }

    function setupTheme() {
        if ( ! function_exists( 'post_exists' ) ) {
            require_once( ABSPATH . 'wp-admin/includes/post.php' );
        }
        
        if( post_exists("Home") == 0 ) {
            $home_page = array();
            $home_page['post_title']    = 'Home';
            $home_page['post_content']  = 'The Red Brown Fox Jump over the Lazy Dog.';
            $home_page['post_status']   = 'publish';
            $home_page['post_author']   = 1;
            $home_page['post_category'] = array(0);
            $home_page['post_type']   = 'page';
            wp_insert_post( $home_page );
        }

        if( post_exists("Blog") == 0 ) {
            $blog_page = array();
            $blog_page['post_title']    = 'Blog';
            $blog_page['post_content']  = '';
            $blog_page['post_status']   = 'publish';
            $blog_page['post_author']   = 1;
            $blog_page['post_category'] = array(0);
            $blog_page['post_type']   = 'page';
            wp_insert_post( $blog_page );
        }

        if( post_exists("About") == 0 ) {
            $blog_page = array();
            $blog_page['post_title']    = 'About';
            $blog_page['post_content']  = 'The Red Brown Fox Jump over the Lazy Dog.';
            $blog_page['post_status']   = 'publish';
            $blog_page['post_author']   = 1;
            $blog_page['post_category'] = array(0);
            $blog_page['post_type']   = 'page';
            wp_insert_post( $blog_page );
        }

        if( post_exists("Contact") == 0 ) {
            $blog_page = array();
            $blog_page['post_title']    = 'Contact';
            $blog_page['post_content']  = 'The Red Brown Fox Jump over the Lazy Dog.';
            $blog_page['post_status']   = 'publish';
            $blog_page['post_author']   = 1;
            $blog_page['post_category'] = array(0);
            $blog_page['post_type']   = 'page';
            wp_insert_post( $blog_page );
        }

        $home = get_page_by_title( 'home' );
        update_option( 'page_on_front', $home->ID );
        update_option( 'show_on_front', 'page' );

        $blog = get_page_by_title( 'Blog' );
        update_option( 'page_for_posts', $blog->ID );
        
        ?>
            <script>
                console.log('Hello WPress had been activated!');
            </script>
        <?php

        $menu_id = '';
        $menuname = 'Primary';
        $menu_exists = wp_get_nav_menu_object( $menuname );
        if( !$menu_exists ) {
            $menu_id = wp_create_nav_menu($menuname);
        } else {
            $menu_id = $menu_exists->term_id;
        }

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' =>  __('Home'),
            'menu-item-classes' => 'home',
            'menu-item-url' => home_url( '/' ), 
            'menu-item-status' => 'publish'));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' =>  __('Blog'),
            'menu-item-classes' => 'blog',
            'menu-item-url' => home_url( '/blog' ), 
            'menu-item-status' => 'publish'));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' =>  __('About'),
            'menu-item-classes' => 'about',
            'menu-item-url' => home_url( '/about' ), 
            'menu-item-status' => 'publish'));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' =>  __('Contact'),
            'menu-item-classes' => 'contact',
            'menu-item-url' => home_url( '/contact' ), 
            'menu-item-status' => 'publish'));
    }
    add_action( 'after_switch_theme', 'setupTheme' );