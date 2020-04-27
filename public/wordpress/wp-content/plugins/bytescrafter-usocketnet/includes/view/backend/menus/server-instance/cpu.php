
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

    <li id="usn-server-instance" class="col-sm-12">
        <div class="row">
            <div id="usn-instance" class="usn-instance-divs">
                <canvas id="cpuChartView" style="width: 100%; height: 200px;"></canvas>
                <h5 style="text-align: center; color: #7b7b7b;">CPU USAGE</h5>
            </div>
        </div>
    </li>

<script type="text/javascript">

    chartz.addChartView('cpuChartView', 'line', [
        {
            data: [],
            label: 'SYSTEM',
            backgroundColor: ['rgba(232, 38, 38, 0.4)'],
        },
        {
            data: [],
            label: 'USER',
            backgroundColor: ['rgba(62, 181, 228, 0.4)'],
        }
    ], ' e3');

    master.on('svr-status', ( status ) => {
        if(status.length > 1) {
            // Complete Object
            let lists = {};
                lists.user = [];
                lists.system = [];

            for( var i = 0; i < status.length; i++ ) {
                lists.user.push( status[i].cpu.user );
                lists.system.push( status[i].cpu.system );
            }      
            
            
            chartz.cpuChartView.data.datasets[0].data = lists.system;
            chartz.cpuChartView.data.datasets[1].data = lists.user;
            chartz.cpuChartView.update();
        } else {
            // Chunck Item - 0 means used, 1 means total.
            chartz.cpuChartView.data.datasets[0].data.push(status.cpu.system);
            chartz.cpuChartView.data.datasets[0].data.shift();
            chartz.cpuChartView.data.datasets[1].data.push(status.cpu.user);
            chartz.cpuChartView.data.datasets[1].data.shift();
            chartz.cpuChartView.update();
        }
    });
    
</script>