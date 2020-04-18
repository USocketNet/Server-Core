
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) 
	{
		exit;
	}

	/**
	 * @package bytescrafter-usocketnet
	*/
?>

<?php

	DEFINE('USN_PREFIX', 'bc_usn_');

	DEFINE('USN_HOST', 'localhost');

	// Global prefix for this plugins table name prefix.
	DEFINE('USN_APPTAB', USN_PREFIX.'apps');
	
	// Global as Plugin URL for WordPress.
	DEFINE('USN_PLUGIN', plugin_dir_url( __FILE__ ));

?>