
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

    // Custom comment walker.
    include_once("classes/class-hellopress-walker_comment.php");

    function is_docupress() {
        if( function_exists("docupress_headstart_check") ) {
            return true;
        } else {
            return false;
        }
    }

    //Include scripts that is needed js and css.
    function hp_plugin_frontend_enqueue()
    {    
        wp_enqueue_style('hp_google_fonts', 
            'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700',
            false
        );

        wp_enqueue_style('hp_bootstrap_css', 
            get_template_directory_uri() . '/assets/bootstrap/css/bootstrap.min.css', 
            array(), 
            false
        );

        wp_enqueue_style('hp_fontawesome_css', 
            get_template_directory_uri() . '/assets/font-awesome/css/font-awesome.min.css', 
            array(), 
            false
        );

        wp_enqueue_script('hp_jquery_js', get_template_directory_uri() . '/assets/jquery/jquery.js', array(),'1.11.1', true);
        wp_enqueue_script('hp_bootstrap_js', get_template_directory_uri() . '/assets/bootstrap/js/bootstrap.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_jqstellar_js', get_template_directory_uri() . '/assets/jquery/jquery.stellar.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_jqsticky_js', get_template_directory_uri() . '/assets/jquery/jquery.sticky.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_jqwow_js', get_template_directory_uri() . '/assets/jquery/wow.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_jqcounto_js', get_template_directory_uri() . '/assets/jquery/jquery.countTo.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_inview_js', get_template_directory_uri() . '/assets/jquery/jquery.inview.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_easypie_js', get_template_directory_uri() . '/assets/jquery/jquery.easypiechart.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_shuffle_js', get_template_directory_uri() . '/assets/jquery/jquery.shuffle.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_magnific_js', get_template_directory_uri() . '/assets/jquery/jquery.magnific-popup.min.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_fitvids_js', get_template_directory_uri() . '/assets/jquery/jquery.fitvids.js', array(),'3.3.2', true);
        wp_enqueue_script('hp_stickysb_js', get_template_directory_uri() . '/assets/jquery/sticky-sidebar.min.js', array(),'', true);
        wp_enqueue_script('hp_theme_js', get_template_directory_uri() . '/assets/jquery/theme.js', array('hp_stickysb_js'),'', true);
        wp_enqueue_style( "hp_styles_css", get_stylesheet_uri() );
    }
    add_action( 'wp_head', 'hp_plugin_frontend_enqueue' );

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
            the_category(' > ');
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
            <?php /* <script>
                console.log('Theme had been initialized!');
            </script> */ ?>
        <?php
    }
    add_action('wp_head', 'hook_javascript');

    function my_filter_head() {
        // show admin bar only for admins and editors. 
        // if admin only, use: manage_options
        if (!current_user_can('edit_posts')) {
            add_filter('show_admin_bar', '__return_false');
            remove_action('wp_head', '_admin_bar_bump_cb');
        }
    } add_action('get_header', 'my_filter_head');

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

        $home = get_page_by_title( 'Home' );
        $blog = get_page_by_title( 'Blog' );
        $about = get_page_by_title( 'About' );
        $contact = get_page_by_title( 'Contact' );

        update_option( 'page_on_front', $home->ID );
        update_option( 'show_on_front', 'page' );
        update_option( 'page_for_posts', $blog->ID );
        
        //auto creat and add menu item if not exist.
        $menu_id = '';
        $menuname = 'Primary';
        $menu_exists = wp_get_nav_menu_object( $menuname );
        if( !$menu_exists ) {
            $menu_id = wp_create_nav_menu($menuname);
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' =>  __('Home'),
                'menu-item-object-id' => $home->ID,
                'menu-item-object' => 'page', 
                'menu-item-status' => 'publish',
                'menu-item-type' => 'post_type'));
    
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' =>  __('Blog'),
                'menu-item-object-id' => $blog->ID,
                'menu-item-object' => 'page', 
                'menu-item-status' => 'publish',
                'menu-item-type' => 'post_type'));
    
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' =>  __('About'),
                'menu-item-object-id' => $about->ID,
                'menu-item-object' => 'page', 
                'menu-item-status' => 'publish',
                'menu-item-type' => 'post_type'));
    
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title' =>  __('Contact'),
                'menu-item-object-id' => $contact->ID,
                'menu-item-object' => 'page', 
                'menu-item-status' => 'publish',
                'menu-item-type' => 'post_type'));
        } else {
            $menu_id = $menu_exists->term_id;
        }
    }
    add_action( 'after_switch_theme', 'setupTheme' );


    add_action( 'widgets_init', 'hp_register_sidebars' );
    function hp_register_sidebars() {
        register_sidebar(
            array(
                'id'            => 'primary',
                'name'          => __( 'Primary Sidebar' ),
                'description'   => __( 'Put all content that you want to show in this site wide sidebar.' ),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h3 class="widget-title">',
                'after_title'   => '</h3>',
            )
        );
    }