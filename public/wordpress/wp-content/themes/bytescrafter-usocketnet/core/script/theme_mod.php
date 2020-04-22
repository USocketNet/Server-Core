    
    <?php
        /**
        * Theme Core - Theme Mod
        *
        * @package hellopress
        * @since 0.1.0
        */
    ?>

<?php

    //Return a string of theme mod, if not exist use default.
    function getThemeField($key, $default) {
        $tarField = get_theme_mod( $key );
        if( empty($tarField) ) {
            return $default;
        } else {
            return $tarField;
        }
        echo $tarField;
    }

    //Get url of logo image.
    function getThemeLogoUrl() {
        $theme_logo = get_site_icon_url();
        if( empty($theme_logo) ) {
            return get_template_directory_uri() . "/assets/images/default-logo.png";
        } else {
            return $theme_logo;
        }
    }

    //Get menu children or items.
    function getThemeMenuItems($key) {
        $menua = wp_get_menu_array(get_theme_mod( $key ));
        foreach($menua as $item) {
            echo '<li><a href="'.$item['url'].'" style="font-weight: 500;">'.$item['title'].'</a></li>';
        }

        if( empty($menua) ) {
            echo '<li><a href="#" style="font-weight: 500;">SubLink A</a></li>';
            echo '<li><a href="#" style="font-weight: 500;">SubLink B</a></li>';
            echo '<li><a href="#" style="font-weight: 500;">SubLink C</a></li>';
            echo '<li><a href="#" style="font-weight: 500;">SubLink D</a></li>';
        }
    }

    //Get featured image of a post by id.
    function getPostFeaturedImage( $postId, $sizeGroup ) {
        $returningImage = get_template_directory_uri()."/assets/images/default-header.jpg";
            if ( has_post_thumbnail( $postId ) ) {
                $imageAttachment = wp_get_attachment_image_src( get_post_thumbnail_id( $postId ), $sizeGroup );
                if( !empty($imageAttachment) ) {
                    $returningImage = $imageAttachment[0];
                }
            } 
        echo $returningImage;
    }

    //Getting header image here.
    function getHeaderImageBg( $key ){
        if(empty( get_theme_mod($key) )) {
            echo get_template_directory_uri()."/assets/images/default-header.jpg";
        } else {
            echo esc_url( get_theme_mod( $key ) );
        }
        
    }