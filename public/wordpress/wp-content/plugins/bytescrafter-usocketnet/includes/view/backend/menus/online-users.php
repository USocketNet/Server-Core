
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) 
	{
		exit;
	}

	/**
	 * @package bytescsrafter-usocketnet
	*/
?>

	<?php /* Header Section */ ?>
		<div class="usn-welcome-header">
			<h1>ONLINE USERS</h1>
			<p>
				Users that are currently connected to any of your<br>
				server instance will be shown below.
			</p>
		</div>
	<?php /* Header Section */ ?>

	<div class="usn-panel-body">
		<table id="usn-online-users" class="stripe" style="width: 100%;">
			<thead>
				<tr>
					<th>IDENTITY</th>
					<th>USERNAME</th>
					<th>IP ADDRESS</th>
					<th>SERVER</th>
					<th>PLAYING</th>
					<th>SPENT TIME</th>
					<th>LAST LOGIN</th>
					<th>ACTION</th>
				</tr>
			</thead>
			
			<tbody>
				<?php for( $int = 0; $int < 49; $int++ ) { ?>
					<tr>
						<td>ID#<?php echo $int; ?></td>
						<td>Username<?php echo $int; ?></td>
						<td>192.168.1.<?php echo $int; ?></td>
						<td>
							<a href="#">Server#<?php echo rand(1000, 9000); ?></a>
						</td>
						<td>
							<a href="#">Game Title</a>
						</td>
						<td><?php echo $int; ?>min, <?php echo rand(1, 59); ?> sec</td>
						<td><?php echo date('Y-m-d H:i:s'); ?></td>
						<td>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#USNBrowse">Browse</button>
							<button type="button" class="btn btn-danger">Debug</button>
						</td>
					</tr>
				<?php } ?>
			</tbody>
		</table>
	</div>

	<!-- MODAL SIGNIN -->
		<div id="USNBrowse" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center" style="margin-top: 20%;">

				<!-- Modal content-->
				<div class="modal-content">

					<div class="modal-header">
						<h4 class="modal-title" style="text-align: center;">User Info</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">

					</div>

					<div class="modal-footer">

					</div>

				</div>
				<!-- Modal content-->

			</div>
			</div>
		</div>
    <!-- MODAL SIGNIN -->