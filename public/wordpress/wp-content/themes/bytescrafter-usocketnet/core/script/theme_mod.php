    
    <?php
        /**
        * Theme Core - Theme Mod
        *
        * @package bytescrafter-usocketnet
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