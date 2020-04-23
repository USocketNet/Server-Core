<?php
/**
 * Docs archive description template
 *
 * This template can be overridden by copying it to yourtheme/docupress/archive/description.php.
 *
 * @author  nK
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( docupress()->get_docs_page_content() ) : ?>
    <div class="docupress-archive-description">
        <?php
        // phpcs:ignore
        echo docupress()->get_docs_page_content();
        ?>
    </div>
    <?php
endif;
