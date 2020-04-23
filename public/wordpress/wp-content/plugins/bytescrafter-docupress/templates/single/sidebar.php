<?php
/**
 * Single docs sidebar template
 *
 * This template can be overridden by copying it to yourtheme/docupress/single/sidebar.php.
 *
 * @author  BytesCrafter
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// phpcs:ignore
$show_parents = docupress()->get_option( 'sidebar_show_nav_parents', 'docupress_single', false );

?>

<div class="docupress-single-sidebar">
    <div class="docupress-single-sidebar-wrap">
        <?php if ( docupress()->get_option( 'sidebar_show_search', 'docupress_single', true ) ) : ?>
            <form role="search" method="get" class="docupress-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                <input type="search" class="docupress-search-field" placeholder="<?php echo esc_attr__( 'Type to search', 'docupress' ); ?>" value="<?php echo get_search_query(); ?>" name="s" autocomplete="off">
                <input type="hidden" name="post_type" value="docs">
                <?php if ( ! $show_parents ) : ?>
                    <input type="hidden" name="child_of" value="<?php echo esc_attr( docupress()->get_current_doc_id() ); ?>">
                <?php endif; ?>
            </form>
            <div class="docupress-search-form-result"></div>
        <?php endif; ?>

        <?php
        // phpcs:ignore
        $nav_list = wp_list_pages(
            array(
                'title_li'  => '',
                'order'     => 'menu_order',
                'child_of'  => $show_parents ? 0 : docupress()->get_current_doc_id(),
                'echo'      => false,
                'post_type' => 'docs',
                'walker'    => new DocuPress_Walker_Docs(),
            )
        );
        if ( $nav_list ) {
            // phpcs:ignore
            $show_childs = docupress()->get_option( 'sidebar_show_nav_childs', 'docupress_single', false );
            ?>
            <ul class="docupress-nav-list<?php echo ( $show_childs ? ' docupress-nav-list-show-childs' : '' ); ?>">
                <?php
                // phpcs:ignore
                echo $nav_list;
                ?>
            </ul>
        <?php } ?>
    </div>
</div>
