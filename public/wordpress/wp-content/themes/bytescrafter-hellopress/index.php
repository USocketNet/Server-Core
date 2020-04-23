
<?php
	/**
    * When “your latest posts” is set in the front page displays section 
    * but home.php does not exist or when front page is set but page.php does not exist.
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

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

<?php get_footer(); ?>