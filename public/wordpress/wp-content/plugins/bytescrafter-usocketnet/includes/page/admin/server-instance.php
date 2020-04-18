
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
                <?php include_once( plugin_dir_path( __FILE__ ) . "instance/_core.php" ); ?>
                <?php include_once( plugin_dir_path( __FILE__ ) . "instance/cpu.php" ); ?>
                <?php include_once( plugin_dir_path( __FILE__ ) . "instance/ram.php" ); ?>
                <?php include_once( plugin_dir_path( __FILE__ ) . "instance/net.php" ); ?>
                
                <li id="usn-server-instance" class="col-sm-12">
                    <div class="row">
                        <div id="usn-instance-cpu" class="col-lg-3 usn-instance-divs" >
                            <canvas id="roundChart<?php echo "1"; ?>" style="width: 100%; height: 200px; margin-bottom: 12px; display: inline-table"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">CPU USAGE</h5>
                            <script>
                                setInterval(function()
                                { 
                                    var used = 50; 
                                    var idle = 100 - used;

                                    // Any of the following formats may be used
                                    var round<?php echo "1"; ?> = document.getElementById("roundChart<?php echo "1"; ?>");
                                    var roundChart<?php echo "1"; ?> = new Chart(round<?php echo "1"; ?>, {
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
                            <canvas id="lineChart<?php echo "1"; ?>" style="width: 100%; height: 200px;"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">RAM USAGE</h5>
                            <script>
                                var ram = [12, 19, 3, 5, 2, 3, 12, 15, 18, 21];
                                setInterval(function()
                                { 
                                    ram.splice(0, 1);
                                    ram.push( Math.floor(Math.random() * 25) );

                                    // Any of the following formats may be used
                                    var line<?php echo "1"; ?> = document.getElementById("lineChart<?php echo "1"; ?>");
                                    var lineChart<?php echo "1"; ?> = new Chart(line<?php echo "1"; ?>, {
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
                            <canvas id="barChart<?php echo "1"; ?>" style="width: 100%; height: 200px;"></canvas>
                            <h5 style="text-align: center; color: #7b7b7b;">NETWORK TRAFFIC</h5>
                            <script>
                                var net = [20, 32, 41, 39, 42, 21, 25, 18, 29, 28];
                                setInterval(function()
                                { 
                                    net.splice(0, 1);
                                    net.push( Math.floor(Math.random() * 25) );

                                    // Any of the following formats may be used
                                    var bar<?php echo "1"; ?> = document.getElementById("barChart<?php echo "1"; ?>");
                                    var barChart<?php echo "1"; ?> = new Chart(bar<?php echo "1"; ?>, {
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
                                <strong id="status-1" style="font-size: 20px;"> ONLINE</strong>
                            </p>
                            <div class="usn-instance-info">
                                <p>
                                    <strong>RESTART: </strong>0
                                </p>
                                <p>
                                    <strong>PING: </strong><a id="ping-1">0</a> ms
                                    <strong>ERROR: </strong><?php echo "1"; ?>
                                </p>
                            </div>
                            <p style="text-align: center;">
                                <button type="button" class="btn btn-danger">RESTART</button>
                                <button type="button" class="btn btn-primary">OPTION</button>
                                <button type="button" class="btn btn-secondary">LOGS</button>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
	</div>
