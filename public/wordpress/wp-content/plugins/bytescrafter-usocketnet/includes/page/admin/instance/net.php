
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
                <canvas id="trafficChartView" style="width: 100%; height: 200px;"></canvas>
                <h5 style="text-align: center; color: #7b7b7b;">NETWORK</h5>
            </div>
        </div>
    </li>

<script type="text/javascript">

    chartz.addChartView('trafficChartView', 'line', [
        {
            data: [],
            label: 'UPLOAD',
            backgroundColor: ['rgba(231, 169, 13, 0.4)'],
        },
        {
            data: [],
            label: 'DOWNLOAD',
            backgroundColor: ['rgba(205, 72, 239, 0.4)'],
        }
    ], ' KB');

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
            
            
            chartz.trafficChartView.data.datasets[0].data = lists.system;
            chartz.trafficChartView.data.datasets[1].data = lists.user;
            chartz.trafficChartView.update();
        } else {
            // Chunck Item - 0 means used, 1 means total.
            chartz.trafficChartView.data.datasets[0].data.push(status.cpu.system);
            chartz.trafficChartView.data.datasets[0].data.shift();
            chartz.trafficChartView.data.datasets[1].data.push(status.cpu.user);
            chartz.trafficChartView.data.datasets[1].data.shift();
            chartz.trafficChartView.update();
        }
    });
    
</script>