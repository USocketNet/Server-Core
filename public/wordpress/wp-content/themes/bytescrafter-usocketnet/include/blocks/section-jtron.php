    
    <?php
        /**
        * Jumbutron
        *
        * @package bytescrafter-usocketnet
        * @since 0.1.0
        */
    ?>
    
    <!-- JUMBUTRON Section -->
    <section id="home" class="tt-fullHeight" data-stellar-vertical-offset="50" data-stellar-background-ratio="0.2" 
        <?php 
            global $post;
            $defaultHeaderImage = get_template_directory_uri()."/assets/images/home-jumbutron.jpg";
            if (has_post_thumbnail( $post->ID ) ) {
                $headerImageHeader = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'header-image' );
                $defaultHeaderImage = $headerImageHeader[0];
            }
        ?>
        style="background: url(<?php echo $defaultHeaderImage; ?>) no-repeat center center; background-attachment: fixed; background-color: #222; background-size: cover;">
        <div class="intro">
          <!-- <div class="intro-sub">Welcome!</div> -->
          <h1>USocket <span>Net</span></h1>
          <p>Realtime WebSocket Multiplayer Server for Indie Game Developers.
          <br> It is a multi-platform that can be used through mobile or standalone computers.
          <br> Optional! Host your own server, contact us now.</p>

          <div class="social-icons">
            <ul class="list-inline">
              <li><a href="https://www.facebook.com/BytesCrafterPH" target="_blank"><i class="fa fa-facebook"></i></a></li>
              <li><a href="https://twitter.com/BytesCrafter" target="_blank"><i class="fa fa-twitter"></i></a></li>
              <li><a href="https://www.youtube.com/channel/UCHXZUImmr9aSKmYpKXqN9vQ" target="_blank"><i class="fa fa-youtube"></i></a></li>
              <li><a href="https://play.google.com/store/apps/dev?id=5394145917362507576" target="_blank"><i class="fa fa-android"></i></a></li>
            </ul>
          </div>
        </div>

        <div class="mouse-icon">
          <div class="wheel"></div>
        </div>
    </section>
    <!-- JUMBUTRON Section -->