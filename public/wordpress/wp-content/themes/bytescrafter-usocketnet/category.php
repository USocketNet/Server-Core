
<?php
	/**
    * Rendering category archive index pages uses the following path in WordPress:
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
						<div class="row">
							<?php
								$num = 0;
								while ( have_posts() ) : the_post(); 
								$num += 1;
							?>
								<div class="col-sm-3">
									<?php the_excerpt(); ?>
								</div>
							<?php
								endwhile;
								wp_reset_query();

								if($num == 0) {
									
								}
								echo $num;
							?>
						</div>
					</div>
				</section>
          	</div>
        </div>
      
    <!-- Content Section --> 

<?php get_footer(); ?>