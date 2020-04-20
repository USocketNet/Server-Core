
<?php
	/**
    * About overwrite page.
	*
	* @package bytescrafter-usocketnet
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

    <!-- About Section -->
    <section id="about" class="about-section section-padding">
        <div class="container">
          <h2 class="section-title wow fadeInUp"><?php the_title(); ?></h2>
          <div class="row">
            <div class="col-md-12 ">
                <?php
                    while ( have_posts() ) : the_post(); ?>
                    <div class="short-info wow fadeInUp">
                        <?php the_content(); ?>
                    </div>
                <?php
                    endwhile;
                    wp_reset_query();
                ?>
            </div>
          </div>
        </div>
      </section>
    <!-- About Section --> 

<?php get_footer(); ?>