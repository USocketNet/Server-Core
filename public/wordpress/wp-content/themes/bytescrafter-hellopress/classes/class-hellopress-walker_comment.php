


<?php

	if ( ! class_exists( 'HelloPress_WalkerComment' ) ) {
		/**
		 * CUSTOM COMMENT WALKER
		 * A custom walker for comments, based on the walker in Twenty Nineteen.
		 */
		class HelloPress_WalkerComment extends Walker_Comment {

			/**
			 * Outputs a comment in the HTML5 format.
			 *
			 * @see wp_list_comments()
			 * @see https://developer.wordpress.org/reference/functions/get_comment_author_url/
			 * @see https://developer.wordpress.org/reference/functions/get_comment_author/
			 * @see https://developer.wordpress.org/reference/functions/get_avatar/
			 * @see https://developer.wordpress.org/reference/functions/get_comment_reply_link/
			 * @see https://developer.wordpress.org/reference/functions/get_edit_comment_link/
			 *
			 * @param WP_Comment $comment Comment to display.
			 * @param int        $depth   Depth of the current comment.
			 * @param array      $args    An array of arguments.
			 */
			protected function html5_comment( $comment, $depth, $args ) {

				$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';

				?>
				<<?php echo $tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static output ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $this->has_children ? 'parent' : '', $comment ); ?>>
					<article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
						<footer class="comment-meta">
							<div class="comment-author vcard">
								<?php
								$comment_author_url = get_comment_author_url( $comment );
								$comment_author     = get_comment_author( $comment );
								$avatar             = get_avatar( $comment, $args['avatar_size'] );
								if ( 0 !== $args['avatar_size'] ) {
									if ( empty( $comment_author_url ) ) {
										echo wp_kses_post( $avatar );
									} else {
										printf( '<a href="%s" rel="external nofollow" class="url">', $comment_author_url ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped --Escaped in https://developer.wordpress.org/reference/functions/get_comment_author_url/
										echo wp_kses_post( $avatar );
									}
								}

								printf(
									'<span class="fn">%1$s</span><span class="screen-reader-text says">%2$s</span>',
									esc_html( $comment_author ),
									__( 'says:', 'hellopress' )
								);

								if ( ! empty( $comment_author_url ) ) {
									echo '</a>';
								}
								?>
							</div><!-- .comment-author -->

							<div class="comment-metadata">
								<a href="<?php echo esc_url( get_comment_link( $comment, $args ) ); ?>">
									<?php
									/* translators: 1: Comment date, 2: Comment time. */
									$comment_timestamp = sprintf( __( '%1$s at %2$s', 'hellopress' ), get_comment_date( '', $comment ), get_comment_time() );
									?>
									<time datetime="<?php comment_time( 'c' ); ?>" title="<?php echo esc_attr( $comment_timestamp ); ?>">
										<?php echo esc_html( $comment_timestamp ); ?>
									</time>
								</a>
								<?php
								if ( get_edit_comment_link() ) {
									echo ' <span aria-hidden="true">&bull;</span> <a class="comment-edit-link" href="' . esc_url( get_edit_comment_link() ) . '">' . __( 'Edit', 'hellopress' ) . '</a>';
								}
								?>
							</div><!-- .comment-metadata -->

						</footer><!-- .comment-meta -->

						<div class="comment-content entry-content">

							<?php

							comment_text();

							if ( '0' === $comment->comment_approved ) {
								?>
								<p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'hellopress' ); ?></p>
								<?php
							}

							?>

						</div><!-- .comment-content -->

						<?php

						$comment_reply_link = get_comment_reply_link(
							array_merge(
								$args,
								array(
									'add_below' => 'div-comment',
									'depth'     => $depth,
									'max_depth' => $args['max_depth'],
									'before'    => '<span class="comment-reply">',
									'after'     => '</span>',
								)
							)
						);

						$by_post_author = hellopress_is_comment_by_post_author( $comment );

						if ( $comment_reply_link || $by_post_author ) {
							?>

							<footer class="comment-footer-meta">

								<?php
								if ( $comment_reply_link ) {
									echo $comment_reply_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Link is escaped in https://developer.wordpress.org/reference/functions/get_comment_reply_link/
								}
								if ( $by_post_author ) {
									echo '<span class="by-post-author">' . __( 'By Post Author', 'hellopress' ) . '</span>';
								}
								?>

							</footer>

							<?php
						}
						?>

					</article><!-- .comment-body -->

				<?php
			}
		}
	}

	
	function requiring_password_content() {
		global $post;
			$label = 'pwbox-' . ( empty( $post->ID ) ? rand() : $post->ID );
			$output = 
			'<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" class="post-password-form" '.
				'method="post" style="text-align: center; padding-top: 7rem; padding-bottom: 5rem;">'. 
				'<label class="pass-label" for="' . $label . '">' . esc_html__( '', 'text-domain' ) . ' </label>'.
					'<input name="post_password" id="' . $label . '" type="password" size="20" placeholder="Post Password"/>'.
					'<input type="submit" name="Submit" class="button docupress-btn docupress-btn-md" value="' . esc_attr__( 'Submit', 'text-domain' ) . '" >'.
			'</form>'.
			'<p class="text-below" style="text-align: center;">'.
				esc_html__( 'This part of documentattion is protected by a password. Contact the admistrator of this project. ', 'text-domain' ).
			'</p>';
		return $output;
	}
	add_filter( 'the_password_form', 'requiring_password_content' );

	// function additional_fields () {
	// 	echo '<p class="comment-form-rating">'.'<span class="commentratingbox">';

	// 		//Current rating scale is 1 to 5. If you want the scale to be 1 to 10, then set the value of $i to 10.
	// 		for( $i=1; $i <= 5; $i++ )
	// 		echo '<span class="commentrating"><input type="radio" name="rating" id="rating" value="'. $i .'"/>'. $i .'</span>';

	// 	echo'</span></p>';

	// }
	// add_action( 'comment_form_logged_in_after', 'additional_fields' );
	// add_action( 'comment_form_after_fields', 'additional_fields' );

?>