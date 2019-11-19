
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
			<h1>SERVER INSTANCE</h1>
			<p>
                If a USocketNet is pointed to WordPress site and has an admin credential will be automatically be added here.
			</p>
		</div>
    <?php /* Header Section */ ?>
    
	<div class="usn-panel-body">
		<div class="row">
            <ul id="usn-container-instance" >
                <?php for( $int = 0; $int < 2; $int++ ) { ?>
                <li id="usn-server-instance" class="col-sm-12">
                    <div class="row">
                        <div id="usn-instance-cpu" class="col-lg-3 usn-instance-divs">
                            <canvas id="roundChart<?php echo $int; ?>" style="width: 100%; height: 200px; margin-bottom: 12px;"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">CPU USAGE</h5>
                            <script>
                                setInterval(function()
                                { 
                                    var used = Math.floor(Math.random() * 25); 
                                    var idle = 100 - used;

                                    // Any of the following formats may be used
                                    var round<?php echo $int; ?> = document.getElementById("roundChart<?php echo $int; ?>");
                                    var roundChart<?php echo $int; ?> = new Chart(round<?php echo $int; ?>, {
                                        type: 'doughnut',
                                        data: {
                                            datasets: [{
                                                data: [used, idle],
                                                backgroundColor: [
                                                '#ea4444',
                                                '#bcbcbc'
                                                ],
                                                borderColor: [
                                                    '#ce3333',
                                                    '#dddddd'
                                                ]
                                            }],

                                            labels: [
                                                'Used',
                                                'Idle'
                                            ],
                                        },
                                        options: {
                                            animation: {
                                                duration: 0
                                            }
                                        }
                                    });
                                }, 1000);
                            </script>
                        </div>
                        <div id="usn-instance-mem" class="col-lg-3 usn-instance-divs">
                            <canvas id="lineChart<?php echo $int; ?>" style="width: 100%; height: 200px;"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">RAM USAGE</h5>
                            <script>
                                var ram = [12, 19, 3, 5, 2, 3, 12, 15, 18, 21];
                                setInterval(function()
                                { 
                                    ram.splice(0, 1);
                                    ram.push( Math.floor(Math.random() * 25) );

                                    // Any of the following formats may be used
                                    var line<?php echo $int; ?> = document.getElementById("lineChart<?php echo $int; ?>");
                                    var lineChart<?php echo $int; ?> = new Chart(line<?php echo $int; ?>, {
                                        type: 'line',
                                        data: {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                                            datasets: [{
                                                data: ram,
                                                label: 'Footprint',
                                                backgroundColor: ['#59c165'],
                                                borderColor: ['#3f9149'],
                                                borderWidth: 1
                                            }]
                                        },
                                        options: {
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero:true
                                                    }
                                                }]
                                            },
                                            animation: {
                                                duration: 0
                                            }
                                        }
                                    });
                                }, 1000);
                                
                            </script>
                        </div>
                        <div id="usn-instance-net" class="col-lg-3 usn-instance-divs">
                            <canvas id="barChart<?php echo $int; ?>" style="width: 100%; height: 200px;"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">NETWORK TRAFFIC</h5>
                            <script>
                                var net = [20, 32, 41, 39, 42, 21, 25, 18, 29, 28];
                                setInterval(function()
                                { 
                                    net.splice(0, 1);
                                    net.push( Math.floor(Math.random() * 25) );

                                    // Any of the following formats may be used
                                    var bar<?php echo $int; ?> = document.getElementById("barChart<?php echo $int; ?>");
                                    var barChart<?php echo $int; ?> = new Chart(bar<?php echo $int; ?>, {
                                        type: 'bar',
                                        data: {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                                            datasets: [{
                                                data: net,
                                                label: 'Packets',
                                                backgroundColor: '#3787d3',
                                                borderColor: '#25649e',
                                                borderWidth: 1
                                            }]
                                        },
                                        options: {
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero:true
                                                    }
                                                }]
                                            },
                                            animation: {
                                                duration: 0
                                            }
                                        }
                                    });
                                }, 1000);
                            </script>
                        </div>
                        <div id="usn-instance-usr" class="col-lg-3 usn-instance-divs">
                            <p style="text-align: center;">
                                <span class="usn-dot-status" style="background-color: #34de34;"></span>
                                <strong style="font-size: 20px;"> ONLINE</strong>
                            </p>
                            <div class="usn-instance-info">
                                <p>
                                    <strong>RESTART: </strong>0
                                </p>
                                <p>
                                    <strong>PING: </strong><a id="ping-<?php echo $int; ?>"></a> ms
                                    <strong>ERROR: </strong><?php echo $int; ?>
                                </p>
                                <script>
                                    setInterval(function()
                                    { 
                                        var ping<?php echo $int; ?> = Math.floor(Math.random() * 12);
                                        var pings<?php echo $int; ?> = document.getElementById('ping-<?php echo $int; ?>');
                                        pings<?php echo $int; ?>.textContent = ping<?php echo $int; ?>;
                                    }, 1000);
                                </script>
                            </div>
                            <p style="text-align: center;">
                                <button type="button" class="btn btn-danger">RESTART</button>
                                <button type="button" class="btn btn-primary">OPTION</button>
                                <button type="button" class="btn btn-secondary">LOGS</button>
                            </p>
                        </div>
                    </div>
                </li>
                <?php } ?>
            </ul>
        </div>
	</div>

    <script type="text/javascript">
        //Require for USocketNet server initial connection.
        var usocketnet = {};
            usocketnet.url = '192.168.1.2'; //ECHO FROM PHP
            usocketnet.port = '3000'; //ECHO FROM PHP
            usocketnet.auth = 'SeCuReHaSkEy123'; //ECHO FROM PHP

        var curUser = {};
            curUser.un = 'Admin'; //ECHO FROM PHP
            curUser.pw = 'Password123'; //ECHO FROM PHP

        //Store all local clients here.
        var client = 'undefined';
        usocketnet_init('SeCuReHaSkEy123');
        usocketnet_connect(curUser, function(returnee){
            console.log(returnee);
        });

        //Initilized the USocketNet Client instance.
        function usocketnet_init(akey)
        {
            client = io.connect( usocketnet.url + ':' + usocketnet.port + '/admin', {
                    query: {
                        token: akey
                    }
                });
            return client;
        }

        function usocketnet_connect( userInfo, callback )
        {
            client.emit( 'connects', userInfo, function( returnee ) 
            {
                client = returnee == 'success' ? client : 'undefined';
                callback( returnee );
            });
        }

        if(client != 'undefined')
        {
            client.on( 'rejected', ( returnee ) => {
                log('You had been rejected by server.');
            });
        }
    </script>