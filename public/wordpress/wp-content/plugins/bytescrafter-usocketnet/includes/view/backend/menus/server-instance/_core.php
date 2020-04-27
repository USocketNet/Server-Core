
<?php
	// Exit if accessed directly
	if ( ! defined( 'ABSPATH' ) ) 
	{
		exit;
	}

	/**
	 * @package bytescrafter-usocketnet-backend
	*/
?>

<script type="text/javascript">

    const curUser = {
        wpid: '<?php echo get_current_user_id(); ?>',
        snid: '<?php echo wp_get_session_token(); ?>',
    };

    const master = new USocketNet('master', '<?php echo USN_HOST; ?>', curUser);

        master.connect();

        master.on('svr-connect', ( data ) => {
            console.log(data);
            document.getElementById('status-1').textContent = 'ONLINE';
        });

        master.on('svr-reconnect', ( data ) => {
            console.log(data);
            document.getElementById('status-1').textContent = 'ONLINE';
        });

        master.on('svr-disconnect', ( data ) => {
            document.getElementById('status-1').textContent = 'OFFLINE';
        });

        master.on('svr-ping', ( data ) => {
            document.getElementById('ping-1').textContent = data.latency;
        });

        master.on('svr-status', ( status ) => {
            
        });

    class USN_Stat {
        construct () {
            
        }

        addChartView( viewName, types, datasets, prefix ) {
            this[viewName] = new Chart(document.getElementById(viewName), {
                type: types,
                data: {
                    labels: [
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
                    ],
                    datasets: datasets
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                //suggestedMax: 1,
                                //suggestedMin: 0,
                                callback: function(value, index, values) {
                                    return value + prefix;
                                }
                            }
                        }]
                    },
                    animation: {
                        duration: 0
                    }
                }
            }) ;
        }

    }

    const chartz = new USN_Stat();
    
</script>