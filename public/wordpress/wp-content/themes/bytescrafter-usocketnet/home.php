
<?php
	/**
    * If WordPress cannot find front-page.php and “your latest posts” is 
    * set in the front page displays section, it will look for home.php. 
    * Additionally, WordPress will look for this file when the posts page 
    * is set in the front page displays section.
	*
	* @package bytescrafter-usocketnet
	* @since 0.1.0
	*/
?>

<?php get_header(); ?>

	<!-- Home Section -->
	<section id="home" class="tt-fullHeight" data-stellar-vertical-offset="50" data-stellar-background-ratio="0.2">
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
          </div> <!-- /.social-icons -->
        </div>

        <div class="mouse-icon">
          <div class="wheel"></div>
        </div>
      </section>
    <!-- Home Section -->

<?php get_footer(); ?>