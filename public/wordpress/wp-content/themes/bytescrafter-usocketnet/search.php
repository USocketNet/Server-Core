
<?php
	/**
    * Displaying search result here.
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<!-- Content Section -->
    
        <div class="container">
          	<div class="row">
				<section id="about" class="about-section section-padding">
					<div class="col-md-12 ">
						<?php
							$num = 0;
							while ( have_posts() ) : the_post(); 
							$num += 1;
						?>
							<div class="short-info">
								<?php the_content(); ?>
							</div>
						<?php
							endwhile;
							wp_reset_query();

							if($num == 0) {
								?>
								<div class="error-404 not-found" style="text-align: center; margin: 50px 0;">
									<header class="page-header">
										<h1 class="page-title"><?php _e( 'SEARCH RESULT EMPTY', 'bytescrafter-usocketnet-theme' ); ?></h1>
									</header>

									<div class="page-content">
										<p><?php _e( 'It looks like nothing was found at during search. Maybe try another word?', 'bytescrafter-usocketnet-theme' ); ?></p>
									</div>
								</div>
								<?php
							}
						?>
					</div>
				</section>
				
          	</div>
        </div>
      
    <!-- Content Section --> 

<?php get_footer(); ?>