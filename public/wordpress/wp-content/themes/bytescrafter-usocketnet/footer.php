
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
						

						<div class="col-md-6">
						<div class="row center-xs">
							<div class="col-sm-6">
							<i class="fa fa-map-marker"></i>
							<address>
								<strong>Address/Street</strong>
								1018 Narra St. Silcas Village<br>
								Biñan City, Philippines<br>
							</address>
							</div>

							<div class="col-sm-6">
							<i class="fa fa-mobile"></i>
							<div class="contact-number">
								<strong>Phone Number</strong>
								(+63) 294 429 4225<br>
								(028) 529 3521
							</div>
							</div>
						</div>

						<div class="row">
							<div class="col-sm-12">
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
							</div>
						</div>
						</div>

						<div class="col-md-6">
							<div class="contact-form">
								<h4 style="margin-bottom: 25px;">Send me a message</h4>
								<form name="contact-form" method="post" action="custom/php/home/sendemail.php">
								<div class="form-group">
									<label for="InputName1">Name</label>
									<input type="text" name="name" class="form-control" id="InputName1" required="">
								</div>
								<div class="form-group">
									<label for="InputEmail1">Email</label>
									<input type="email" name="email" class="form-control" id="InputEmail1" required="">
								</div>
								<!-- <div class="form-group">
									<label for="InputSubject">Subject</label>
									<input type="text" name="subject" class="form-control" id="InputSubject">
								</div> -->
								<div class="form-group">
									<label for="InputTextarea">Message</label>
									<textarea name="message" class="form-control" id="InputTextarea" rows="5" required=""></textarea>
								</div>

								<button type="submit" name="submit" class="btn btn-primary">Send Message</button>
								</form>
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
						<p>USocketNet &copy; <?php echo date("Y"); ?>. All rights reserved.</p>
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