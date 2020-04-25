
<?php
	/**
	* The template for displaying 404 pages (not found)
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<div class="error-404 not-found" style="text-align: center; margin: 50px 0;">
				<header class="page-header">
					<h1 class="page-title"><?php _e( '404 Page Cant Be Found', 'bytescrafter-usocketnet-theme' ); ?></h1>
				</header>

				<div class="page-content">
					<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'bytescrafter-usocketnet-theme' ); ?></p>
				</div>
			</div>

		</main>
	</section>

<?php get_footer(); ?>
