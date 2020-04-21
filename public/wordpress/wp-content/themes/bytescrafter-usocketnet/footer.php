
<?php
	/**
	 * The template for displaying the footer
    *
    * Contains the closing of the #content div and all content after.
	 *
	 * @package bytescrafter-usocketnet
	 * @since 0.1.0
	 */
?>

    	<?php wp_footer(); ?>

		<!-- Contact Section -->
			<section id="contact" class="contact-section section-padding">
				<div class="container">
				<!-- <h2 class="section-title wow fadeInUp">CONTACT US</h2> -->
					<div class="row">
						
						<div class="col-md-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<!-- <div class="intro-sub">Welcome!</div> -->
									<a href="<?php echo get_home_url(); ?>">
										<img src="<?php echo get_site_icon_url(); ?>" style="height: 70px; width: 70px;">
									</a>
									<h1 ><?php echo get_bloginfo('name'); ?></h1>
									<!-- <p>Realtime WebSocket Multiplayer Server for Indie Game Developers.</p> -->
									<div class="social-icons">
										<ul class="list-inline">
											<li><a href="<?php echo get_theme_mod( 'social_gp' ); ?>" target="_blank"><i class="fa fa-android"></i></a></li>
											<li><a href="<?php echo get_theme_mod( 'social_yt' ); ?>" target="_blank"><i class="fa fa-youtube"></i></a></li>
											<li><a href="<?php echo get_theme_mod( 'social_tw' ); ?>"><i class="fa fa-twitter"></i></a></li>
											<li><a href="<?php echo get_theme_mod( 'social_fb' ); ?>" target="_blank"><i class="fa fa-facebook"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong>MENU A</strong>
									<ul>
										<li><a href="#">SUBMENU 1</a></li>
										<li><a href="#">SUBMENU 2</a></li>
										<li><a href="#">SUBMENU 3</a></li>
										<li><a href="#">SUBMENU 4</a></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-md-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong>MENU B</strong>
									<ul>
										<li><a href="#">SUBMENU 1</a></li>
										<li><a href="#">SUBMENU 2</a></li>
										<li><a href="#">SUBMENU 3</a></li>
										<li><a href="#">SUBMENU 4</a></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-md-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong>MENU C</strong>
									<ul>
										<li><a href="#">SUBMENU 1</a></li>
										<li><a href="#">SUBMENU 2</a></li>
										<li><a href="#">SUBMENU 3</a></li>
										<li><a href="#">SUBMENU 4</a></li>
									</ul>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		<!-- Contact Section -->

		<!-- Footer Section -->

			<footer class="footer-wrapper">
				<div class="container">
				<div class="row">
					<div class="col-md-12">
					<div class="copyright text-center">
						<p><?php echo get_bloginfo('name'); ?> &copy; <?php echo date("Y"); ?>. All rights reserved.</p>
					</div>
					</div>
				</div>
				</div>
			</footer>

			<div class="scroll-up">
				<a href="#home"><i class="fa fa-chevron-up"></i></a>
			</div>

		<!-- Footer Section -->

    </body>
</html>