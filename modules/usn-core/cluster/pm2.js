
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

const os = require('os');
const pm2 = require('pm2');

class usn_pm2 {
    /**
     * During instantiation of usn_syntry class, a constructor is 
     * invoked which needs 0 parameter.
     */  
    constructor() {
        //Reserve!
    }

    //This summary will return callback with instance cpu, mem, etc.
    summary( cback ) {
        pm2.connect(function(err) {
            if (err) {
                console.error(err)        
            }
    
            pm2.list( (error, processDescriptionList) => {
              if(error) {
                console.log("List: " + error);
              }

              const metrics = processDescriptionList.map((p) => {
                return {
                  pid: p.pm_id, //
                  name: p.name, //
                  version: p.pm2_env.version, //
                  status: p.pm2_env.status, //
                  cpu: p.monit.cpu / 100, //
                  ram: Math.floor(p.monit.memory / 1000000), //

                  uptime: Math.floor((Date.now() - p.pm2_env.pm_uptime) / 1000), //
                  restart_normal: p.pm2_env.restart_time, //
                  restart_unstable: p.pm2_env.unstable_restarts, //
                  latency: p.pm2_env.axm_monitor['Event Loop Latency'], //
                  latency_p95: p.pm2_env.axm_monitor['Event Loop Latency p95'], //
                  request: p.pm2_env.axm_monitor['Active requests'], //s
                  handles: p.pm2_env.axm_monitor['Active handles'], //s
                  heap_percent_used: p.pm2_env.axm_monitor['Heap Usage'], //s
                };
            });
  
            pm2.disconnect();

            //console.log(data[0].latency.value);
            for(var i=0; i<metrics.length; i++) {
                if(typeof metrics[i].latency != 'undefined') {
                  metrics[i].latency = metrics[i].latency.value;
                }

                if(typeof metrics[i].latency_p95 != 'undefined') {
                  metrics[i].latency_p95 = metrics[i].latency_p95.value;
                }

                if(typeof metrics[i].request != 'undefined') {
                  metrics[i].request = metrics[i].request.value;
                }

                if(typeof metrics[i].handles != 'undefined') {
                  metrics[i].handles = metrics[i].handles.value;
                }

                if(typeof metrics[i].heap_percent_used != 'undefined') {
                  metrics[i].heap_percent_used = metrics[i].heap_percent_used.value;
                }
            }
            
            cback(metrics);
          });
      });
    }

    //Returns a callback that usually composed of machine related info.
    hostinfo( cback ) {
        pm2.connect(function(err) {
            if (err) {
                console.error(err)        
            }
    
            pm2.list( (error, processDescriptionList) => {
              if(error) {
                console.log("List: " + error);
              }

              const metrics = processDescriptionList.map((p) => {
                return {
                    hostname: os.hostname(),
                    system: os.platform(),
                    uptime: Math.floor(os.uptime() - 1000),
                    cpu: os.cpus()[0].model + ' x' + os.cpus().length,
                    arch: os.arch(),
                    free_mem: os.freemem(),
                    total_mem: os.totalmem()
                };
            });
  
            pm2.disconnect();
            cback(metrics);
          });
      });
    }

    //Returns a callback that contains nodejs raw resources info.
    monitor( cback ) {
        pm2.connect(function(err) {
            if (err) {
                console.error(err)        
            }
    
            pm2.list( (error, processDescriptionList) => {
              if(error) {
                console.log("List: " + error);
              }

              const metrics = processDescriptionList.map((p) => {
                return {
                    percent_heap_used: p.pm2_env.axm_monitor['Heap Usage'],
                    used_heap_size: p.pm2_env.axm_monitor['Used Heap Size'],
                    total_heap_size: p.pm2_env.axm_monitor['Heap Size'],
                    active_request: p.pm2_env.axm_monitor['Active requests'],
                    active_handles: p.pm2_env.axm_monitor['Active handles'],
                    event_loop: p.pm2_env.axm_monitor['Event Loop Latency'],
                    event_loop_p95: p.pm2_env.axm_monitor['Event Loop Latency p95'],
                };
            });
  
            pm2.disconnect();
            cback(metrics);
          });
      });
    }

    //Return a callback that contains instance detailed information.
    instance( cback ) {
        pm2.connect(function(err) {
            if (err) {
                console.error(err)        
            }
    
            pm2.list( (error, processDescriptionList) => {
              if(error) {
                console.log("List: " + error);
              }

              const metrics = processDescriptionList.map((p) => {
                return {
                    watch: p.pm2_env.watch,
                    args: p.pm2_env.args,
                    node_version: p.pm2_env.node_version,
                    auto_restart: p.pm2_env.autorestart,
                    instances: p.pm2_env.instances,
                    execution: p.pm2_env.exec_mode,
                    exec_path: p.pm2_env.pm_exec_path,
                    path_log: p.pm2_env.pm_out_log_path,
                    path_error: p.pm2_env.pm_err_log_path,
                    normal_restart: p.pm2_env.restart_time,
                    unstable_restart: p.pm2_env.unstable_restarts,
                    uptime: new Date(p.pm2_env.pm_uptime),
                    lifetime: Date.now() - p.pm2_env.pm_uptime,
                };
            });
  
            pm2.disconnect();
            cback(metrics);
          });
      });
    }

    /**
     * Return a complete information based on developer standard.
     * @param  {} cback
     */
    complete( cback ) {
      pm2.connect(function(err) {
          if (err) {
              console.error(err)        
          }
  
          pm2.list( (error, processDescriptionList) => {
            if(error) {
              console.log("List: " + error);
            }

            const metrics = processDescriptionList.map((p) => {
              return {
                pid: p.pm_id, //s
                name: p.name, //s
                version: p.pm2_env.version, //s
                status: p.pm2_env.status, //s
                cpu: p.monit.cpu / 100, //s
                ram: p.monit.memory, //s
                
                machine_hostname: os.hostname(), //h
                machine_system: os.platform(), //h
                machine_uptime: os.uptime(), //h
                machine_cpu: os.cpus()[0].model + ' x' + os.cpus().length, //h
                machine_free_mem: os.freemem(), //h
                machine_total_mem: os.totalmem(), //h

                heap_percent_used: p.pm2_env.axm_monitor['Heap Usage'], //s
                heap_size_used: p.pm2_env.axm_monitor['Used Heap Size'],
                heap_size_total: p.pm2_env.axm_monitor['Heap Size'],

                request: p.pm2_env.axm_monitor['Active requests'], //s
                handles: p.pm2_env.axm_monitor['Active handles'], //s
                
                latency: p.pm2_env.axm_monitor['Event Loop Latency'], //s
                latency_p95: p.pm2_env.axm_monitor['Event Loop Latency p95'], //s

                watch: p.pm2_env.watch,
                args: p.pm2_env.args,
                node_version: p.pm2_env.node_version,
                auto_restart: p.pm2_env.autorestart,
                instances: p.pm2_env.instances,
                execution: p.pm2_env.exec_mode,
                exec_path: p.pm2_env.pm_exec_path,
                path_log: p.pm2_env.pm_out_log_path,
                path_error: p.pm2_env.pm_err_log_path,
                restart_normal: p.pm2_env.restart_time, //s
                restart_unstable: p.pm2_env.unstable_restarts, //s
                
                uptime: Math.floor(Date.now() - p.pm2_env.pm_uptime) / 1000 //s
              };
          });

          pm2.disconnect();
          cback(metrics);
        });
    });
  }
}

/**
 * Initialized USN usn_pm2 class.
 * @param  {} nsp
 */
module.exports.init = () => {
    return new usn_pm2();
};
