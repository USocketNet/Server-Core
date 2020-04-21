
<?php
	/**
    * If WordPress cannot find front-page.php and “your latest posts” is 
    * set in the front page displays section, it will look for home.php. 
    * Additionally, WordPress will look for this file when the posts page 
    * is set in the front page displays section.
	*
	* @package bytescrafter-usocketnet
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<?php include_once("include/blocks/section-jtron.php"); ?>

    <!-- Content Section -->
    <section id="content" class="section-padding">
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