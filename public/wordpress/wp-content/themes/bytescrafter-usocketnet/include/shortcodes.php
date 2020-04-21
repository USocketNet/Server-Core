<?php
    /**
    * Section for bloglist.
    *
    * @package bytescrafter-usocketnet
    * @since 0.1.0
    */
?>

<?php

    function bc_get_jumbutron($atts) {
        $blogItem = shortcode_atts( array(
            'title' => 'NO TITLE PASSED',
            ), $atts );
            include_once("blocks/section-jtron.php");
    }
    add_shortcode( 'bc_jtron', 'bc_get_jumbutron' );

    //Add custom shortcode for blocks for Blog List
    function bc_bloglist_display($atts) {
        $blogItem = shortcode_atts( array(
            'title' => 'NO TITLE PASSED',
            'catname' => '',
            'count' => 12
            ), $atts );
            include_once("blocks/section-blog.php");
    }
    add_shortcode( 'bc_bloglist', 'bc_bloglist_display' );