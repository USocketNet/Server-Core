
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
        <title>USocketNet</title>
        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>