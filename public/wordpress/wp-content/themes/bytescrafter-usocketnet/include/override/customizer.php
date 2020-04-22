
<?php
	/**
	 * Customizer script.
	 *
	 * @package hellopress
	 * @since 0.1.0
	 */
?>

<?php

    function minimalist_customize_register($wp_customize){
        
        $wp_customize->add_section('minimalist_color_scheme', array(
            'title'    => __('Color Scheme', 'minimalist'),
            'priority' => 120,
        ));

        // //  =============================
        // //  = Text Input                =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[text_test]', array(
        //     'default'        => 'Arse!',
        //     'capability'     => 'edit_theme_options',
        //     'type'           => 'option',

        // ));

        // $wp_customize->add_control('themename_text_test', array(
        //     'label'      => __('Text Test', 'themename'),
        //     'section'    => 'themename_color_scheme',
        //     'settings'   => 'themename_theme_options[text_test]',
        // ));

        // //  =============================
        // //  = Radio Input               =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[color_scheme]', array(
        //     'default'        => 'value2',
        //     'capability'     => 'edit_theme_options',
        //     'type'           => 'option',
        // ));

        // $wp_customize->add_control('themename_color_scheme', array(
        //     'label'      => __('Color Scheme', 'themename'),
        //     'section'    => 'themename_color_scheme',
        //     'settings'   => 'themename_theme_options[color_scheme]',
        //     'type'       => 'radio',
        //     'choices'    => array(
        //         'value1' => 'Choice 1',
        //         'value2' => 'Choice 2',
        //         'value3' => 'Choice 3',
        //     ),
        // ));

        // //  =============================
        // //  = Checkbox                  =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[checkbox_test]', array(
        //     'capability' => 'edit_theme_options',
        //     'type'       => 'option',
        // ));

        // $wp_customize->add_control('display_header_text', array(
        //     'settings' => 'themename_theme_options[checkbox_test]',
        //     'label'    => __('Display Header Text'),
        //     'section'  => 'themename_color_scheme',
        //     'type'     => 'checkbox',
        // ));


        // //  =============================
        // //  = Select Box                =
        // //  =============================
        //  $wp_customize->add_setting('themename_theme_options[header_select]', array(
        //     'default'        => 'value2',
        //     'capability'     => 'edit_theme_options',
        //     'type'           => 'option',

        // ));
        // $wp_customize->add_control( 'example_select_box', array(
        //     'settings' => 'themename_theme_options[header_select]',
        //     'label'   => 'Select Something:',
        //     'section' => 'themename_color_scheme',
        //     'type'    => 'select',
        //     'choices'    => array(
        //         'value1' => 'Choice 1',
        //         'value2' => 'Choice 2',
        //         'value3' => 'Choice 3',
        //     ),
        // ));


        // //  =============================
        // //  = Image Upload              =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[image_upload_test]', array(
        //     'default'           => 'image.jpg',
        //     'capability'        => 'edit_theme_options',
        //     'type'           => 'option',

        // ));

        // $wp_customize->add_control( new WP_Customize_Image_Control($wp_customize, 'image_upload_test', array(
        //     'label'    => __('Image Upload Test', 'themename'),
        //     'section'  => 'themename_color_scheme',
        //     'settings' => 'themename_theme_options[image_upload_test]',
        // )));

        // //  =============================
        // //  = File Upload               =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[upload_test]', array(
        //     'default'           => 'arse',
        //     'capability'        => 'edit_theme_options',
        //     'type'           => 'option',

        // ));

        // $wp_customize->add_control( new WP_Customize_Upload_Control($wp_customize, 'upload_test', array(
        //     'label'    => __('Upload Test', 'themename'),
        //     'section'  => 'themename_color_scheme',
        //     'settings' => 'themename_theme_options[upload_test]',
        // )));


        // //  =============================
        // //  = Color Picker              =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[link_color]', array(
        //     'default'           => '000',
        //     'sanitize_callback' => 'sanitize_hex_color',
        //     'capability'        => 'edit_theme_options',
        //     'type'           => 'option',

        // ));

        // $wp_customize->add_control( new WP_Customize_Color_Control($wp_customize, 'link_color', array(
        //     'label'    => __('Link Color', 'themename'),
        //     'section'  => 'themename_color_scheme',
        //     'settings' => 'themename_theme_options[link_color]',
        // )));


        // //  =============================
        // //  = Page Dropdown             =
        // //  =============================
        // $wp_customize->add_setting('themename_theme_options[page_test]', array(
        //     'capability'     => 'edit_theme_options',
        //     'type'           => 'option',

        // ));

        // $wp_customize->add_control('themename_page_test', array(
        //     'label'      => __('Page Test', 'themename'),
        //     'section'    => 'themename_color_scheme',
        //     'type'    => 'dropdown-pages',
        //     'settings'   => 'themename_theme_options[page_test]',
        // ));

    }

    add_action('customize_register', 'minimalist_customize_register');


    //adding setting for Footer text
    function social_link_customizer($wp_customize) {
        //adding section in wordpress customizer   
        $wp_customize->add_section('social_links_section', array(
            'title' => 'Social Links'
        ));

        //adding setting facebook
        $wp_customize->add_setting('social_fb', array(
            'default'        => 'https://www.facebook.com',
            'transport' => 'refresh',
        )); $wp_customize->add_control('social_fb', array(
            'label'   => 'Facebook',
            'section' => 'social_links_section',
            'type'    => 'text',
            'description' => __('Put Facebook page url here:', 'facebook' ),
            'input_attrs' => array(
                'placeholder' => __( 'https://www.facebook.com/BytesCrafterPH', 'facebook' ),
            )
        ));

        //adding setting facebook
        $wp_customize->add_setting('social_tw', array(
            'default'        => 'https://www.twitter.com',
            'transport' => 'refresh',
        )); $wp_customize->add_control('social_tw', array(
            'label'   => 'Twitter',
            'section' => 'social_links_section',
            'type'    => 'text',
            'description' => __('Put Twitter account username here:', 'twitter' ),
            'input_attrs' => array(
                'placeholder' => __( 'https://twitter.com/BytesCrafter', 'twitter' ),
            )
        ));

        //adding setting facebook
        $wp_customize->add_setting('social_yt', array(
            'default'        => 'https://www.youtube.com',
            'transport' => 'refresh',
        )); $wp_customize->add_control('social_yt', array(
            'label'   => 'YouTube',
            'section' => 'social_links_section',
            'type'    => 'text',
            'description' => __('Put your YouTube channel here:', 'youtube' ),
            'input_attrs' => array(
                'placeholder' => __( 'https://www.youtube.com/channel/UCHXZUImmr9aSKmYpKXqN9vQ', 'youtube' ),
            )

        ));

        //adding setting facebook
        $wp_customize->add_setting('social_gp', array(
            'default'        => 'https://www.googleplay.com',
            'transport' => 'refresh',
        )); $wp_customize->add_control('social_gp', array(
            'label'   => 'GooglePlay',
            'section' => 'social_links_section',
            'type'    => 'text',
            'description' => __('Put your GooglePlay developer page here:', 'googleplay' ),
            'input_attrs' => array(
                'placeholder' => __( 'https://play.google.com/store/apps/dev?id=5394145917362507576', 'googleplay' ),
            )

        ));

    } add_action('customize_register', 'social_link_customizer');

     //adding setting for Footer text
     function welcome_link_customizer($wp_customize) {
        //adding section in wordpress customizer   
        $wp_customize->add_section('welcome_links_section', array(
            'title' => 'Welcome Section'
        ));

        $wp_customize->add_setting('welcome_subtitle', array(
            'default'        => 'WELCOME',
            'transport' => 'refresh',
        )); $wp_customize->add_control('welcome_subtitle', array(
            'label'   => 'SubTitle',
            'section' => 'welcome_links_section',
            'type'    => 'text',
            'description' => __('Put your subtitle here:', 'subtitle' ),
            'input_attrs' => array(
                'placeholder' => __( 'WELCOME', 'subtitle' ),
            )
        ));

        $wp_customize->add_setting('welcome_title1', array(
            'default'        => 'HELLO',
            'transport' => 'refresh',
        )); $wp_customize->add_control('welcome_title1', array(
            'label'   => '1st Title',
            'section' => 'welcome_links_section',
            'type'    => 'text',
            'description' => __('Put first blue title here:', 'title1' ),
            'input_attrs' => array(
                'placeholder' => __( 'Hello', 'title1' ),
            )
        ));

        $wp_customize->add_setting('welcome_title2', array(
            'default'        => 'PRESS',
            'transport' => 'refresh',
        )); $wp_customize->add_control('welcome_title2', array(
            'label'   => '2nd Title',
            'section' => 'welcome_links_section',
            'type'    => 'text',
            'description' => __('Put first red title here:', 'title2' ),
            'input_attrs' => array(
                'placeholder' => __( 'World', 'title2' ),
            )
        ));

        $wp_customize->add_setting('welcome_desc', array(
            'default'        => 'The Red Brown Fox Jump over the Lazy Dog.',
            'transport' => 'refresh',
        )); $wp_customize->add_control('welcome_desc', array(
            'label'   => '2nd Title',
            'section' => 'welcome_links_section',
            'type'    => 'text',
            'description' => __('Put short description here:', 'description' ),
            'input_attrs' => array(
                'placeholder' => __( 'World', 'description' ),
            )
        ));

    } add_action('customize_register', 'welcome_link_customizer');

    //adding setting for Footer text
    function menus_link_customizer($wp_customize) {
        //adding section in wordpress customizer   
        $wp_customize->add_section('menus_links_section', array(
            'title' => 'Menus Section'
        ));

        $wp_customize->add_setting('menua_name', array(
            'default'        => 'MENU A',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menua_name', array(
            'label'   => '1ST MENU GROUP',
            'section' => 'menus_links_section',
            'type'    => 'text',
            'description' => __('Put menu name here:', 'maname' ),
            'input_attrs' => array(
                'placeholder' => __( 'WELCOME', 'maname' ),
            )
        ));
        $wp_customize->add_setting('menua_target', array(
            'default'        => 'Choose Menu',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menua_target', array(
            'label'   => '1ST Target',
            'section' => 'menus_links_section',
            'type'    => 'select',
            'description' => __('Choose menu key here:', 'matarget' ),
            'choices' => get_list_of_menus()
        ));

        $wp_customize->add_setting('menub_name', array(
            'default'        => 'MENU B',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menub_name', array(
            'label'   => '2ND MENU GROUP',
            'section' => 'menus_links_section',
            'type'    => 'text',
            'description' => __('Put menu name here:', 'mbname' ),
            'input_attrs' => array(
                'placeholder' => __( 'WELCOME', 'mbname' ),
            )
        ));
        $wp_customize->add_setting('menub_target', array(
            'default'        => 'Choose Menu',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menub_target', array(
            'label'   => '2ND Target',
            'section' => 'menus_links_section',
            'type'    => 'select',
            'description' => __('Choose menu key here:', 'mbtarget' ),
            'choices' => get_list_of_menus()
        ));

        $wp_customize->add_setting('menuc_name', array(
            'default'        => 'MENU C',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menuc_name', array(
            'label'   => '3RD MENU GROUP',
            'section' => 'menus_links_section',
            'type'    => 'text',
            'description' => __('Put menu name here:', 'mcname' ),
            'input_attrs' => array(
                'placeholder' => __( 'WELCOME', 'mcname' ),
            )
        ));
        $wp_customize->add_setting('menuc_target', array(
            'default'        => 'Choose Menu',
            'transport' => 'refresh',
        )); $wp_customize->add_control('menuc_target', array(
            'label'   => '3RD Target',
            'section' => 'menus_links_section',
            'type'    => 'select',
            'description' => __('Choose menu key here:', 'mctarget' ),
            'choices' => get_list_of_menus()
        ));

    } add_action('customize_register', 'menus_link_customizer');

    function get_list_of_menus() {
        $menus = wp_get_nav_menus();
        $menuList = array();
        foreach($menus as $menu) {
            $menuList[$menu->slug] = $menu->name;
        }
        return $menuList;
    }