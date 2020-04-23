
<?php
	/**
    * If WordPress cannot find front-page.php and “your latest posts” is 
    * set in the front page displays section, it will look for home.php. 
    * Additionally, WordPress will look for this file when the posts page 
    * is set in the front page displays section.
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>


    <div class="col-md-8 ">
        <div class="row">
        <?php
            $counterPost = 0;
            while ( have_posts() ) : the_post(); 
                $counterPost +=1; ?>
            
                <div class="col-sm-6" style="margin-bottom: 50px;">
                    <article class="blog-post-wrapper">
                        <div class="figure">  
                            <div class="post-thumbnail">  
                                    <a href="<?php the_permalink(); ?>"><img src="<?php echo getPostFeaturedImage(get_the_ID(), 'block-blog-list'); ?>" class="img-responsive " alt=""></a>
                                <i class="fa <?php getPostFormatIcon(get_post_format()); ?>"></i>
                            </div>
                        </div>
                        <header class="entry-header">
                        <div class="post-meta">
                            <span class="the-category"> 
                                <?php 
                                    $post_tags = get_the_tags();
                                    if ( $post_tags ) {
                                        foreach( $post_tags as $tag ) {
                                            echo '<a href="'.get_tag_link($tag->term_id).'">'.$tag->name.'</a> '; 
                                        }
                                    }
                                ?>
                            </span>
                        </div>
                        <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel=""><?php the_title(); ?></a></h2>
                        <hr>
                        <div class="entry-meta">
                            <ul class="list-inline">
                            <?php /* <li>
                                <span class="the-author">
                                <a href="<?php //echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" 
                                    title="<?php //echo esc_attr( get_the_author() ); ?>"><?php //the_author(); ?></a> 
                                </span>
                            </li> */ ?>
                            <li>
                                <span class="the-time">
                                <a href="#"><?php echo get_the_date(); ?></a>
                                </span>
                            </li>
                            <?php /* <li>
                                <span class="the-views">
                                <a href="#" title="share">0</a>
                                </span>
                            </li> */ ?>
                            <li>
                                <span class="the-comments">
                                <a href="#" title=""><?php echo get_comments_number(); ?></a>
                                </span>
                            </li>
                            </ul>
                        </div>
                        </header>
                    </article>
                </div>

        <?php

            if($counterPost % 2 == 0 ) {
                ?>
                </div>
                <div class="row">
                <?php
            }
            endwhile;
            wp_reset_query();
        ?>
            </div>
        <?php get_template_part( 'template/pagination' ); ?>
    </div>

    <div class="col-md-4" id="sidebar">
        <?php get_sidebar( 'primary' );; ?>
    </div>

<?php get_footer(); ?>