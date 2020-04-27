
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
			<h1>ACTIVE CHANNELS</h1>
			<p>
                Channels are simply a game room or chat container where users 
                subcriptions allows them to send and received events.
			</p>
		</div>
	<?php /* Header Section */ ?>

	<div class="usn-panel-body">
		<table id="usn-online-users" class="stripe" style="width: 100%;">
			<thead>
				<tr>
					<th>IDENTITY</th>
					<th>INSTANCE</th>
					<th>GAME</th>
					<th>VARIANT</th>
					<th>CURRENT</th>
					<th>CAPACITY</th>
					<th>EXISTENCE</th>
					<th>ACTION</th>
				</tr>
			</thead>
			
			<tbody>
				<?php for( $int = 0; $int < 49; $int++ ) { ?>
					<tr>
						<td>ID#<?php echo $int; ?></td>
						<td>
							<a href="#">Server#<?php echo rand(1000, 9000); ?></a>
						</td>
						<td>
							<a href="#">Game Title</a>
						</td>
                        <td>Default<?php echo $int; ?></td>
                        <td><?php echo rand(1, 1000).' users'; ?></td>
                        <td>1000 cap</td>
						<td><?php echo $int; ?>min, <?php echo rand(1, 59); ?> sec</td>
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