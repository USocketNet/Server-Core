    
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