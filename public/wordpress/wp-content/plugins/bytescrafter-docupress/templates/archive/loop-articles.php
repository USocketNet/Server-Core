<?php
/**
 * Docs archive loop articles template
 *
 * This template can be overridden by copying it to yourtheme/docupress/archive/loop-articles.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// phpcs:disable
$show            = docupress()->get_option( 'show_articles', 'docupress_archive', true );
$articles_number = intval( docupress()->get_option( 'articles_number', 'docupress_archive', 3 ) );

if ( -1 === $articles_number ) {
    $articles_number = 9999;
}

if ( ! $show || $articles_number < 1 ) {
    return;
}

$top_articles = new WP_Query(
    array(
        'post_type'      => 'docs',
        'posts_per_page' => -1, // phpcs:ignore
        'post_parent'    => get_the_ID(),
        'orderby'        => array(
            'menu_order' => 'ASC',
            'date'       => 'DESC',
        ),
    )
);
$parent_link  = get_permalink();

$count = 0;
// phpcs:enable

if ( $top_articles->have_posts() ) : ?>

    <ul>
        <?php
        while ( $top_articles->have_posts() ) :
            $top_articles->the_post();
            if ( $count >= $articles_number ) {
                break;
            }
            $count++;
            ?>

            <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>

        <?php endwhile; ?>

        <?php if ( $top_articles->post_count > $articles_number ) : ?>
            <li class="more">
                <a href="<?php echo esc_url( $parent_link ); ?>">
                    <?php
                    // translators: %s articles count.
                    printf( esc_html__( '+%s More', 'docupress' ), intval( $top_articles->post_count ) - $articles_number );
                    ?>
                </a>
            </li>
        <?php endif; ?>
    </ul>

<?php endif;
wp_reset_postdata(); ?>
