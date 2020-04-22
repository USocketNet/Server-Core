
<?php
	/**
	* The template for displaying the header
	*
	* @package hellopress
	* @since 0.1.0
	*/

	get_header();
?>

<!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><?php echo get_bloginfo( 'name' ); ?></title>
        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>

        <div id="tt-preloader">
            <div id="pre-status">
                <div class="preload-placeholder"></div>
            </div>
        </div>

        <!-- Navigation -->
        <header class="header">
            <nav class="navbar navbar-custom" role="navigation" style="margin-bottom: -4px;">
            <div class="container">
                <div class="hp-nav-row">
                    <form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
                        <div>
                            <input class="form-control mr-sm-2" type="text" value="" name="s" id="s" placeholder="Search" aria-label="Search">
                        </div>
                    </form>
                </div>
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="navbar-brand">
                        <a href="<?php echo get_home_url(); ?>">
                            <img src="<?php echo getThemeLogoUrl(); ?>">
                            <?php echo get_bloginfo('name'); ?>
                        </a>
                    </div>
                </div>

                <div class="collapse navbar-collapse" id="custom-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <?php usocketnet_get_main_menu(); ?>
                    </ul>
                </div>
            </div>
            </nav>
        </header>
        <!-- Navigation -->

        <!-- Header Section -->
            <?php if(is_home() || !is_front_page() ) { ?>

                <section class="header-section text-center" data-stellar-vertical-offset="50" data-stellar-background-ratio="0.2" 
                    style="background: url(
                        <?php 
                            global $post; 
                            if( is_home() ) {
                                $imageAttachment = wp_get_attachment_image_src(get_post_thumbnail_id(get_option('page_for_posts')),'full'); 
                                if( !empty($imageAttachment) ) {
                                    echo $imageAttachment[0];
                                } else {
                                    echo get_template_directory_uri()."/assets/images/default-header.jpg";
                                }
                            } else if(is_search() ) {
                                getHeaderImageBg( 'search_image' );
                            } else if(is_404()) {
                                getHeaderImageBg( '404_image' );
                            } else {
                                getPostFeaturedImage($post->ID, 'header-image');
                            }
                            
                        ?>) no-repeat top center">
                    <div class="header-section-bg">
                        <div class="container">
                            <div class="row">
                            <div class="col-md-12">
                                <h2 class="section-title wow fadeInUp">
                                    <?php 
                                        if( is_home() ) {
                                            echo getThemeField('blog_header', 'Change this Blog Page name on your theme Customizer');
                                        } else if(is_search() ) {
                                            echo getThemeField('search_header', 'Change this Search Page name on your theme Customizer');
                                        } else if(is_404()) {
                                            echo getThemeField('404_header', 'Change this 404 Page name on your theme Customizer');
                                        } else if(is_category()) {
                                            echo getThemeField('category_header', 'Change this Category Page name on your theme Customizer');
                                        } else {
                                            echo get_the_title(get_the_ID()); 
                                        }
                                    ?>
                                </h2>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <?php if( !is_home() && !is_search() && !is_404() ) { ?>
                <div class="container" style="position: relative; top: -50px;">
                    <div class="row">
                        <div class="col-md-12">
                            <ol class="breadcrumb">
                                <?php get_breadcrumbs(); ?>
                            </ol>
                        </div>	
                    </div>
                </div>
                <?php } ?>

            <?php } ?>
        <!-- Header Section -->
