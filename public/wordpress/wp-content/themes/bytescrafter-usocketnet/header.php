
<?php
	/**
	* The template for displaying the header
	*
	* @package bytescrafter-usocketnet
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
            <nav class="navbar navbar-custom" role="navigation">
            <div class="container">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="navbar-brand" href="#">
                    <img src="<?php echo get_site_icon_url(27); ?>" alt="">
                    <?php echo get_bloginfo('name'); ?>
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

        <?php if(!is_home()) { ?>

            <!-- Inquire Section -->
                <section class="hire-section text-center" data-stellar-vertical-offset="50" data-stellar-background-ratio="0.2">
                    <div class="hire-section-bg">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-12">
                            <h2><?php the_title(); ?></h2>
                            <!-- <a href="#" data-toggle="modal" data-target="#signIn" class="btn btn-default">Click Here!</a> -->
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            <!-- Inquire Section -->

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <ol class="breadcrumb">
                            <?php get_breadcrumbs(); ?>
                        </ol>
                    </div>	
                </div>
            </div>
        <?php } ?>

        <?php