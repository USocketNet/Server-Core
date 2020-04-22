
<?php
	/**
    * About overwrite page.
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

    <!-- Content Section -->
    <section id="about" class="about-section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-md-12 ">
                <?php
                    while ( have_posts() ) : the_post(); ?>
                    <div class="short-info">
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
    <!-- Content Section --> 

<?php get_footer(); ?>