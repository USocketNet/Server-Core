    
    <?php
        /**
        * Dynamic Header Content
        *
        * @package hellopress
        * @since 0.1.0
        */
    ?>

<?php

    //adding setting for Footer text
    function dynamic_header_customizer($wp_customize) {
        //adding section in wordpress customizer   
        $wp_customize->add_section('dynamic_header_section', array(
            'title' => 'Dynamic Header'
        ));

        $wp_customize->add_setting('blog_header', array(
            'default'        => 'Blog Page Text',
        )); $wp_customize->add_control('blog_header', array(
            'label'   => 'Blog Page',
            'section' => 'dynamic_header_section',
            'type'    => 'text',
            'description' => __('Header center text on blog page:', 'blog_head' ),
            'input_attrs' => array(
                'placeholder' => __( 'My Blog Page Text', 'blog_head' ),
            )
        ));

        $wp_customize->add_setting('search_header', array(
            'default'        => 'Single Page Text',
        )); $wp_customize->add_control('search_header', array(
            'label'   => 'Search Page',
            'section' => 'dynamic_header_section',
            'type'    => 'text',
            'description' => __('Header center text on search page:', 'search_head' ),
            'input_attrs' => array(
                'placeholder' => __( 'My Search Page Text', 'search_head' ),
            )
        ));
        $wp_customize->add_setting('search_image', array(
            'transport'         => 'refresh',
            'height'         => 325,
        )); $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'search_image_background', array(
            'label'             => __('Search Background Image', 'hellopress'),
            'section'           => 'dynamic_header_section',
            'settings'          => 'search_image',    
        )));

        $wp_customize->add_setting('404_header', array(
            'default'        => '404 Page Text',
        )); $wp_customize->add_control('404_header', array(
            'label'   => '404 Page',
            'section' => 'dynamic_header_section',
            'type'    => 'text',
            'description' => __('Header center text on 404 page:', '404_head' ),
            'input_attrs' => array(
                'placeholder' => __( 'My 404 Page Text', '404_head' ),
            )
        ));
        $wp_customize->add_setting('404_image', array(
            'transport'         => 'refresh',
            'height'         => 325,
        )); $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, '404_image_background', array(
            'label'             => __('404 Background Image', 'hellopress'),
            'section'           => 'dynamic_header_section',
            'settings'          => '404_image',    
        )));

        $wp_customize->add_setting('category_header', array(
            'default'        => 'Category Page Text',
        )); $wp_customize->add_control('category_header', array(
            'label'   => 'Category Page',
            'section' => 'dynamic_header_section',
            'type'    => 'text',
            'description' => __('Header center text on category page:', 'category_head' ),
            'input_attrs' => array(
                'placeholder' => __( 'My Category Page Text', 'category_head' ),
            )
        ));

        $wp_customize->add_setting('docupress_header', array(
            'default'        => 'DocuPress Page Text',
        )); $wp_customize->add_control('docupress_header', array(
            'label'   => 'DocuPress Page',
            'section' => 'dynamic_header_section',
            'type'    => 'text',
            'description' => __('Header center text on DocuPress page:', 'docupress_head' ),
            'input_attrs' => array(
                'placeholder' => __( 'My DocuPress Page Text', 'docupress_head' ),
            )
        ));

    } add_action('customize_register', 'dynamic_header_customizer');