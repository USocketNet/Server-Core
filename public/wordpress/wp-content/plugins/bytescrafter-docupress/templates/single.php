<?php
/**
 * Single docs template
 *
 * This template can be overridden by copying it to yourtheme/docupress/single.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

docupress()->get_template_part( 'global/wrap-start' );

while ( have_posts() ) :
    the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'docupress-single' . ( docupress()->get_option( 'ajax', 'docupress_single', true ) ? ' docupress-single-ajax' : '' ) ); ?>>

        <?php docupress()->get_template_part( 'single/sidebar' ); ?>

        <div class="docupress-single-content">
            <?php
            docupress()->get_template_part( 'single/content-breadcrumbs' );

            docupress()->get_template_part( 'single/content-title' );
            ?>

            <div class="entry-content">
                <?php
                the_content();

                wp_link_pages(
                    array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'docupress' ),
                        'after'  => '</div>',
                    )
                );

                docupress()->get_template_part( 'single/content-articles' );
                ?>
            </div><!-- .entry-content -->

            <?php

            docupress()->get_template_part( 'single/footer' );

            docupress()->get_template_part( 'single/adjacent-links' );

            docupress()->get_template_part( 'single/feedback' );

            docupress()->get_template_part( 'single/feedback-suggestion' );

            if ( docupress()->get_option( 'show_comments', 'docupress_single', true ) ) {
                docupress()->get_template_part( 'single/comments' );
            }

            ?>
        </div><!-- .docupress-single-content -->
    </article><!-- #post-## -->
    <?php

endwhile;

docupress()->get_template_part( 'global/wrap-end' );
