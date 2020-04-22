    
    <?php
        /**
        * Section for bloglist.
        *
        * @package hellopress
        * @since 0.1.0
        */
    ?>

<?php
    global $post;
    $args = array(
        'posts_per_page'   => $blogItem['count'],
        // 'offset'           => 0,
        //'cat'         => '1',
        'category_name'    => $blogItem['catname'],
        // 'orderby'          => 'date',
        // 'order'            => 'DESC',
        // 'include'          => '',
        // 'exclude'          => '',
        // 'meta_key'         => '',
        // 'meta_value'       => '',
        // 'post_type'        => 'post',
        // 'post_mime_type'   => '',
        // 'post_parent'      => '',
        // 'author'	   => '',
        // 'author_name'	   => '',
        // 'post_status'      => 'publish',
        // 'suppress_filters' => true,
        // 'fields'           => '',
    );
    $posts_array = get_posts( $args );
    //Get category id from name here.
    
    $myposts = get_posts( $args );
?>
    
    <section id="blog" class="latest-blog-section section-padding">
        <div class="container">
            <div class="row">
                <!-- <h2 class="">Latest Post</h2> -->

                <?php 
                    $counterPost = 0;
                    foreach ( $myposts as $post ) : 
                        $counterPost +=1;
                        setup_postdata( $post );
                ?>

                <div class="col-sm-4" style="margin-top: 50px;">
                    <article class="blog-post-wrapper">
                        <div class="figure">  
                            <div class="post-thumbnail">  
                                <?php if (has_post_thumbnail( $post->ID ) ) { ?>
                                    <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'block-blog-list' ); ?>
                                        <a href="<?php the_permalink(); ?>"><img src="<?php echo $image[0]; ?>" class="img-responsive " alt=""></a>
                                <?php } else { ?>
                                        <a href="<?php the_permalink(); ?>"><img src="<?php echo get_template_directory_uri().'/assets/images/default-photo.png'; ?>" class="img-responsive " alt=""></a>
                                <?php } ?>
                                <i class="fa fa-file-photo-o"></i>
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
                        <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel=""><?php the_title().get_post_format($post->ID); ?></a></h2>
                        <hr>
                        <div class="entry-meta">
                            <ul class="list-inline">
                            <li>
                                <span class="the-author">
                                <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" title="<?php echo esc_attr( get_the_author() ); ?>"><?php the_author(); ?></a> 
                                </span>
                            </li>
                            <li>
                                <span class="the-time">
                                <a href="#"><?php echo get_the_date(); ?></a>
                                </span>
                            </li>
                            <li>
                                <span class="the-views">
                                <a href="#" title="share">0</a>
                                </span>
                            </li>
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
                        if($counterPost % 3 == 0 ) {
                            ?>
                            </div>
                            <div class="row">
                            <?php
                        }

                    endforeach; 
                    wp_reset_postdata();
                ?>

            </div>

            <div class="blog-more text-center">
                <a href="#" class="btn btn-primary">View More</a>
            </div>
        
        </div>
    </section>
