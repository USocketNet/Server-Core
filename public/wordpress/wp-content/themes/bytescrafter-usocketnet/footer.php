
<?php
	/**
	 * The template for displaying the footer
    *
    * Contains the closing of the #content div and all content after.
	 *
	 * @package hellopress
	 * @since 0.1.0
	 */
?>

    	<?php wp_footer(); ?>

		<!-- Contact Section -->
			<section id="contact" class="contact-section section-padding">
				<div class="container">
				<!-- <h2 class="section-title wow fadeInUp">CONTACT US</h2> -->
					<div class="row">
						
						<div class="col-sm-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<!-- <div class="intro-sub">Welcome!</div> -->
									<a href="<?php echo get_home_url(); ?>">
										<img src="<?php echo getThemeLogoUrl(); ?>" style="height: 70px; width: 70px;">
									</a>
									<h1 ><?php echo get_bloginfo('name'); ?></h1>
									<!-- <p>Realtime WebSocket Multiplayer Server for Indie Game Developers.</p> -->
									<div class="social-icons">
										<ul class="list-inline">
											<li><a href="<?php echo getThemeField( 'social_gp', '#' ); ?>" target="_blank"><i class="fa fa-android"></i></a></li>
											<li><a href="<?php echo getThemeField( 'social_yt', '#' ); ?>" target="_blank"><i class="fa fa-youtube"></i></a></li>
											<li><a href="<?php echo getThemeField( 'social_tw', '#' ); ?>"><i class="fa fa-twitter"></i></a></li>
											<li><a href="<?php echo getThemeField( 'social_fb', '#' ); ?>" target="_blank"><i class="fa fa-facebook"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div class="col-sm-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong><?php echo get_theme_mod( 'menua_name' ); ?></strong>
									<ul>
										<?php
											$menua = wp_get_menu_array(get_theme_mod( 'menua_target' ));
											foreach($menua as $item) {
												echo '<li><a href="'.$item['url'].'">'.$item['title'].'</a></li>';
											}                         
										?>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-sm-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong><?php echo get_theme_mod( 'menub_name' ); ?></strong>
									<ul>
										<?php
											$menua = wp_get_menu_array(get_theme_mod( 'menub_target' ));
											foreach($menua as $item) {
												echo '<li><a href="'.$item['url'].'">'.$item['title'].'</a></li>';
											}                         
										?>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-sm-3 footer-section-space">
							<div class="row">
								<div class="footer-company">
									<strong><?php echo get_theme_mod( 'menuc_name' ); ?></strong>
									<ul>
										<?php
											$menua = wp_get_menu_array(get_theme_mod( 'menuc_target' ));
											foreach($menua as $item) {
												echo '<li><a href="'.$item['url'].'">'.$item['title'].'</a></li>';
											}    
										?>
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