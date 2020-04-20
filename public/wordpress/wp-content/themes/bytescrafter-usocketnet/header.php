
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
        <!-- <link rel="profile" href="https://gmpg.org/xfn/11" /> -->
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700' rel='stylesheet' type='text/css'>
        <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" media="screen">
        <link href="assets/css/animate.css" rel="stylesheet">
        <link href="assets/css/magnific-popup.css" rel="stylesheet">
        <link href="assets/css/style.css" rel="stylesheet" media="screen">
        <link href="assets/css/responsive.css" rel="stylesheet">
        <link rel="shortcut icon" href="assets/images/ico/favicon.png">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/images/ico/apple-touch-icon-57-precomposed.png">
        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>