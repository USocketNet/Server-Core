
<?php
	/**
    * Displaying search result here.
	*
	* @package bytescrafter-usocketnet
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
								
							}
							echo $num;
						?>
					</div>
				</section>
          	</div>
        </div>
      
    <!-- Content Section --> 

<?php get_footer(); ?>