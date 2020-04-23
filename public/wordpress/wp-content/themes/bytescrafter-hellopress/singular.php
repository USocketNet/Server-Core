
<?php
	/**
    * The template file used to render a static page (page post-type). Note that 
    * unlike other post-types, page is special to WordPress and uses the following path:
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<!-- Content Section -->

		<section id="about" class="about-section section-padding">
			<div class="col-md-12 ">
				<?php
					while ( have_posts() ) : the_post(); 
				?>
					<div class="short-info">
						<?php the_content(); ?>
					</div>
				<?php
					endwhile;
					wp_reset_query();
				?>
			</div>
		</section>

	<?php

		if ( ( is_single() || is_page() ) && ( comments_open() || get_comments_number() ) && ! post_password_required() ) {
	?>

			<div class="comments-wrapper section-inner">
				<?php comments_template(); ?>
			</div>

	<?php
		}
	?>
      

<?php get_footer(); ?>


<?php
	// if ( have_posts() ) {
	// 	while ( have_posts() ) {
	// 		the_post();
	// 		get_template_part( 'template/content', get_post_type() );
	// 	}
	// }
	// get_template_part( 'template/footer-menus-widgets' );