
<?php
	/**
    * Rendering category archive index pages uses the following path in WordPress:
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<section class="latest-blog-section section-padding">
		<div class="container">
			<div class="row">
				<!-- <h2 class="">Latest Post</h2> -->

				<?php 
					$counterPost = 0;
					while ( have_posts() ) : the_post(); 
						$counterPost += 1;
				?>

				<div class="col-sm-6" style="margin-top: 50px;">
					<article class="blog-post-wrapper">
						<div class="figure">  
							<div class="post-thumbnail">  
								<a href="<?php the_permalink(); ?>"><img src="<?php getPostFeaturedImage($post->ID, 'block-blog-list'); ?>" class="img-responsive " alt=""></a>
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
						<p><?php the_excerpt(); ?></p>
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

			<div class="blog-more text-center">
				<a href="#" class="btn btn-primary">View More</a>
			</div>
		
		</div>
	</section>
      
<?php get_footer(); ?>