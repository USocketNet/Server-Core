<?php
/**
 * Docs archive title template
 *
 * This template can be overridden by copying it to yourtheme/docupress/archive/title.php.
 *
 * @author  BytesCrafter
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>

<header class="page-header" style="margin: 0;">
    <h1 class="page-title">
        <?php
        // phpcs:ignore
        echo docupress()->get_docs_page_title();
        ?>
    </h1>
</header><!-- .page-header -->
