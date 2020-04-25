<?php
/**
 * Single docs content title template
 *
 * This template can be overridden by copying it to yourtheme/docupress/single/content-title.php.
 *
 * @author  BytesCrafter
 * @package docupress/Templates
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<header class="entry-header">
    <?php the_title( '<h1 class="entry-title" itemprop="headline">', '</h1>' ); ?>
</header><!-- .entry-header -->
