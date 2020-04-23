<?php
/**
 * Docs archive template
 *
 * This template can be overridden by copying it to yourtheme/docupress/archive.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

docupress()->get_template_part( 'global/wrap-start' );

?>
<?php docupress()->get_template_part( 'archive/title' ); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <div class="entry-content">
        <?php docupress()->get_template_part( 'archive/description' ); ?>

        <div class="docupress-archive">
            <ul class="docupress-archive-list">
                <?php
                // phpcs:ignore
                $current_term = false;

                if ( have_posts() ) :
                    while ( have_posts() ) :
                        the_post();

                        // phpcs:ignore
                        $terms = wp_get_post_terms( get_the_ID(), 'docs_category' );
                        if (
                            $terms &&
                            ! empty( $terms ) &&
                            isset( $terms[0]->name ) &&
                            $current_term !== $terms[0]->name
                        ) {
                            // phpcs:ignore
                            $current_term = $terms[0]->name;
                            ?>
                            <li class="docupress-archive-list-category">
                                <?php echo esc_html( $terms[0]->name ); ?>
                            </li>
                            <?php
                        }

                        ?>
                        <li class="docupress-archive-list-item">
                            <?php docupress()->get_template_part( 'archive/loop-title' ); ?>
                            <?php docupress()->get_template_part( 'archive/loop-articles' ); ?>
                        </li>
                        <?php
                    endwhile;
                endif;
                ?>
            </ul>
        </div>

        <?php
            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . __( 'Pages:', 'docupress' ),
                    'after'  => '</div>',
                )
            );
            ?>
    </div>
</article>

<?php

docupress()->get_template_part( 'global/wrap-end' );
