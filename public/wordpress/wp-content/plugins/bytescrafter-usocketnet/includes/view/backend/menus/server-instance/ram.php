
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
                <canvas id="ramChartView" style="width: 100%; height: 200px;"></canvas>
                <h5 style="text-align: center; color: #7b7b7b;">MEMORY USAGE</h5>
            </div>
        </div>
    </li>

<script type="text/javascript">
    
    chartz.addChartView('ramChartView', 'line', [
        {
            data: [],
            label: 'USED',
            backgroundColor: ['rgba(231, 13, 13, 0.4)'],
        },
        {
            data: [],
            label: 'TOTAL',
            backgroundColor: ['rgba(24, 231, 13, 0.4)'],
        }
    ], ' MB');

    master.on('svr-status', ( status ) => {
        if(status.length > 1) {
            // Complete Object
            let lists = {};
                lists.used = [];
                lists.total = [];

            for( var i = 0; i < status.length; i++ ) {
                lists.used.push( status[i].ram.used );
                lists.total.push( status[i].ram.total );
            }      
            
            chartz.ramChartView.data.datasets[0].data = lists.used;
            chartz.ramChartView.data.datasets[1].data = lists.total;
            chartz.ramChartView.update();
        } else {
            // Chunck Item - 0 means used, 1 means total.
            chartz.ramChartView.data.datasets[0].data.push(status.ram.used);
            chartz.ramChartView.data.datasets[0].data.shift();
            chartz.ramChartView.data.datasets[1].data.push(status.ram.total);
            chartz.ramChartView.data.datasets[1].data.shift();
            chartz.ramChartView.update();
        }
    });
    
</script>