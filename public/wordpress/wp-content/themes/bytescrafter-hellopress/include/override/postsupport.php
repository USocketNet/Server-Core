<?php
    /**
    * Section for bloglist.
    *
    * @package hellopress
    * @since 0.1.0
    */
?>

<?php

    //Add thumbnail support for post.
    add_theme_support( 'post-thumbnails' );
    //Blog list size.
    if ( function_exists( 'add_image_size' ) ) { 
        add_image_size( 'block-blog-list', 480, 280, true );
    }
    //Header size.
    if ( function_exists( 'add_image_size' ) ) { 
        add_image_size( 'header-image', 1280, 720, true );
    }

    // aside – Typically styled without a title. Similar to a Facebook note update.
    // gallery – A gallery of images. Post will likely contain a gallery shortcode and will have image attachments.
    // link – A link to another site. Themes may wish to use the first <a href=””> tag in the post content as the external link for that post. An alternative approach could be if the post consists only of a URL, then that will be the URL and the title (post_title) will be the name attached to the anchor for it.
    // image – A single image. The first <img /> tag in the post could be considered the image. Alternatively, if the post consists only of a URL, that will be the image URL and the title of the post (post_title) will be the title attribute for the image.
    // quote – A quotation. Probably will contain a blockquote holding the quote content. Alternatively, the quote may be just the content, with the source/author being the title.
    // status – A short status update, similar to a Twitter status update.
    // video – A single video or video playlist. The first <video /> tag or object/embed in the post content could be considered the video. Alternatively, if the post consists only of a URL, that will be the video URL. May also contain the video as an attachment to the post, if video support is enabled on the blog (like via a plugin).
    // audio – An audio file or playlist. Could be used for Podcasting.
    // chat – A chat transcript, like so:
    add_theme_support( 'post-formats', array( 'status', 'image', 'video', 'audio' ) );