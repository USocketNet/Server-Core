
<?php
	/**
    * If WordPress cannot find front-page.php and “your latest posts” is 
    * set in the front page displays section, it will look for home.php. 
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<div id="primary" class="sidebar">
    <?php do_action( 'before_sidebar' ); ?>
        <?php if ( is_active_sidebar( 'primary' ) ) : ?>
            <aside id="search" class="widget widget_search">
                <?php //get_search_form(); we dont need this because of widget. ?>
            </aside>
            <?php dynamic_sidebar( 'primary' ); ?>
        <?php endif; ?>
   <?php do_action( 'after_sidebar' ); ?>
</div>