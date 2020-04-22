
<?php
	/**
    * Displaying search result here.
	*
	* @package hellopress
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>


	<!-- Content Section -->
		<div id="main-content" class="container clearfix" >

			<div class="col-md-12 " id="content">
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
									<!-- <li>
										<span class="the-author">
										<a href="<?php //echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" 
											title="<?php //echo esc_attr( get_the_author() ); ?>"><?php //the_author(); ?></a> 
										</span>
									</li> -->
									<li>
										<span class="the-time">
										<a href="#"><?php echo get_the_date(); ?></a>
										</span>
									</li>
									<!-- <li>
										<span class="the-views">
										<a href="#" title="share">0</a>
										</span>
									</li> -->
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

						if($counterPost == 0) {
							?>
							<div class="error-404 not-found" style="text-align: center; margin: 50px 0;">
								<header class="page-header">
									<h1 class="page-title"><?php _e( 'SEARCH RESULT EMPTY', 'bytescrafter-usocketnet-theme' ); ?></h1>
								</header>

								<div class="page-content">
									<p><?php _e( 'It looks like nothing was found at during search. Maybe try another word?', 'bytescrafter-usocketnet-theme' ); ?></p>
								</div>
							</div>
							<?php
						}
					?>
				</div>
			</div>

			<!-- <div class="col-md-4" id="sidebar" >
				<div class="sidebar__inner">
					<p>This is sticky column</p>
				</div>
			</div> -->

			</div>
			<!-- Content Section --> 
	<!-- Content Section -->
    

<?php get_footer(); ?>