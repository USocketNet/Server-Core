<?php
/**
 * Docs archive loop title template
 *
 * This template can be overridden by copying it to yourtheme/docupress/archive/loop-title.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// phpcs:disable
$articles       = get_pages(
    array(
        'child_of'  => get_the_ID(),
        'post_type' => 'docs',
    )
);
$articles_count = count( $articles );
// phpcs:enable

?>

<a href="<?php the_permalink(); ?>" class="docupress-archive-list-item-title">
    <?php the_post_thumbnail( 'docupress_archive' ); ?>
    <span>
        <span>
            <?php
            // translators: %s articles count.
            printf( esc_html( _n( '%s Article', '%s Articles', $articles_count, 'docupress' ) ), esc_html( $articles_count ) );
            ?>
        </span>
        <h2><?php the_title(); ?></h2>
    </span>
</a>
