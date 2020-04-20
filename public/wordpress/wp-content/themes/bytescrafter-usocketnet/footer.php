
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
					<div class="contact-form">
						<strong>Send me a message</strong>
						<form name="contact-form" method="post" action="custom/php/home/sendemail.php">
						<div class="form-group">
							<label for="InputName1">Name</label>
							<input type="text" name="name" class="form-control" id="InputName1" required="">
						</div>
						<div class="form-group">
							<label for="InputEmail1">Email</label>
							<input type="email" name="email" class="form-control" id="InputEmail1" required="">
						</div>
						<div class="form-group">
							<label for="InputSubject">Subject</label>
							<input type="text" name="subject" class="form-control" id="InputSubject">
						</div>
						<div class="form-group">
							<label for="InputTextarea">Message</label>
							<textarea name="message" class="form-control" id="InputTextarea" rows="5" required=""></textarea>
						</div>

						<button type="submit" name="submit" class="btn btn-primary">Send Message</button>
						</form>
					</div>
					</div><!-- /.col-md-6 -->

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
						<div class="location-map">
						<div id="mapCanvas" class="map-canvas"></div>
						</div>
					</div>
					</div>

					</div>
				</div><!-- /.row -->
				</div><!-- /.container -->
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