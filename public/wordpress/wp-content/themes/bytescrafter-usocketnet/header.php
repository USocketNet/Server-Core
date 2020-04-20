
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
                    <?php 
                        $menu_items = wp_get_nav_menu_items( 'main-menu' );
                        foreach( $menu_items as $item ) {
                           echo "<li><a href='".$item->url."'>".$item->title."</a></li>";
                          }
                    ?>
                </ul>
                </div>
            </div>
            </nav>
        </header>
        <!-- Navigation -->