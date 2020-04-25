<?php
/**
 * A template partial to output pagination for the Twenty Twenty default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package hellopress
 */
	global $wp_query;
    
	$big = 999999999; // need an unlikely integer

	$post_links = paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages,
			'type'  => 'array',
			'prev_next'   => true,
			'prev_text'    => __('« Prev '),
			'next_text'    => __(' Next »'),
		)
	);

	if( is_array( $post_links ) ) {
		$paged = ( get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');

		$pagination = '<div class="hp-post-pagination"><ul class="pagination">';

		foreach ( $post_links as $page ) {
			$curpag = "<li>".$page."</li>";
			if (strpos($page, 'current') !== false) {
				$curpag = str_replace('<li>', '<li class="active">', $curpag);
			}
			$pagination .= $curpag;
		}

		echo $pagination.'</ul></div>';
	}