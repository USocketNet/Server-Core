
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
			<h1>APPLICATIONS</h1>
			<p>
                Add, Edit, Delete game or app using the server instance. Each game will have a unique id to connect.
			</p>
		</div>
	<?php /* Header Section */ ?>

	<div class="usn-panel-body">
		<div class="usn-panel-first">
			<button type="button" class="btn btn-success" data-toggle="modal" data-target="#CreateNewApp">Create New</button>
		</div>
		<table id="apps-datatables" class="stripe" style="width: 100%;"></table>
		<div id="apps-notification" class="alert alert-info usn-center-item " role="alert" style="margin-top: 20px;">
			Currently fetching updates for all available applications. Please wait...
		</div>
	</div>

	<div id="CreateNewApp" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center" style="margin-top: 49px;">

				<div class="modal-content">

					<div class="modal-header">
						<h4 class="modal-title" style="text-align: center;">Create Application</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">
						<form id="create-app-form">
							<div class="form-group">
								<label for="appname_create">Name:</label>
								<input required type="text" class="form-control" id="appname_create" name="appname_create" placeholder="Public name of this application.">
							</div>
							<div class="form-group">
								<label for="appdesc_create">Description:</label>
								<textarea required type="text" class="form-control" id="appdesc_create" name="appdesc_create" rows="3"
									placeholder="Short description of your application." ></textarea>
							</div>
							<div class="form-group">
								<label for="appurl_create">URL:</label>
								<input required type="text" class="form-control" id="appurl_create" name="appurl_create" placeholder="http:/www.host.com/games/test">
							</div>
							<div class="form-group">
								<label for="appcap_create">CAPACITY:</label>
								<input required oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
									type="number" maxlength="4" class="form-control" id="appcap_create" name="appcap_create" placeholder="Max Users">
							</div>
							<div class="form-group">
								<label for="appsta_create">STATUS:</label><br>
								<select class="form-control" id="appsta_create" name="appsta_create">
									<option selected="selected">Active</option>
									<option>Inactive</option>
								</select>
							</div>
							<div class="form-group">
								<div class="alert alert-dark usn-center-item" role="alert">
									<strong>NOTE:</strong> Before we submit your request a dialog confirmation will appear 
									to ask for your permission to complete the task.
								</div>
							</div>
							<div class="usn-center-item">
								<button id="create-app-btn" type="submit" class="btn btn-success"> - SUBMIT - </button>
							</div>
							<div id="dialog-confirm-create" title="Confirmation">
								<p id="confirm-content-create"></p>
							</div>
						</form>
					</div>

					<div class="modal-footer">
						<div id="CNAMessage" class="alert usn-fullwidth usn-center-item usn-display-hide" role="alert">
							<p id="CNAMcontent">A simple success alert—check it out!</p>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>

	<div id="EditAppOption" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center" style="margin-top: 49px;">

				<div class="modal-content">

					<div class="modal-header">
						<h4 class="modal-title" style="text-align: center;">Modify Application</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">
						<form id="edit-app-form">
							<div class="form-group">
								<label for="appname_edit">Name:</label>
								<input required type="text" class="form-control" id="appname_edit" name="appname_edit" placeholder="Public name of this application.">
							</div>
							<div class="form-group">
								<label for="appdesc_edit">Description:</label>
								<textarea required type="text" class="form-control" id="appdesc_edit" name="appdesc_edit" rows="3"
									placeholder="Short description of your application." ></textarea>
							</div>
							<div class="form-group">
								<label for="appurl_edit">URL:</label>
								<input required type="text" class="form-control" id="appurl_edit" name="appurl_edit" placeholder="http:/www.host.com/games/test">
							</div>
							<div class="form-group">
								<label for="appcap_edit">CAPACITY:</label>
								<input required oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
									type="number" maxlength="4" class="form-control" id="appcap_edit" name="appcap_edit" placeholder="Max Users">
							</div>	
							<div class="form-group">
								<label for="appsta_edit">STATUS:</label><br>
								<select class="form-control" id="appsta_edit" name="appsta_edit">
									<option selected="selected">Active</option>
									<option>Inactive</option>
								</select>
							</div>
							<div class="form-group">
								<div class="alert alert-dark usn-center-item" role="alert">
									<strong>NOTE:</strong> Before we submit your request a dialog confirmation will appear 
									to ask for your permission to complete the task.
								</div>
							</div>
							<div class="usn-center-item">
								<input id="appid_edit" type="hidden" value="">
								<button id="delete-app-btn" type="submit" class="btn btn-danger"> - DELETE - </button>
								<button id="update-app-btn" type="submit" class="btn btn-success"> - UPDATE - </button>
							</div>
							<div id="dialog-confirm-edit" title="Confirmation">
								<p id="confirm-content-edit"></p>
							</div>
						</form>
					</div>

					<div class="modal-footer">
						<div id="DFAMessage" class="alert usn-fullwidth usn-center-item usn-display-hide" role="alert">
							<p id="DFAMcontent">A simple success alert—check it out!</p>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>

	<div id="jquery-overlay" class="modal-backdrop fade show usn-display-hide" style="z-index: 9999;"></div>