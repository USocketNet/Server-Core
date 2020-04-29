
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

    summary() {
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
                    pmid: p.pm_id,
                    name: p.name,
                    version: p.version,
                    status: p.pm2_env.status,
                    cpu: p.monit.cpu / 100,
                    memory: p.monit.memory
                };
            });
  
            pm2.disconnect();
            callback(metrics);
          });
      });
    }

    machine() {
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
                    machine_hostname: os.hostname(),
                    machine_system: os.platform(),
                    machine_uptime: os.uptime(),
                    machine_cpu: os.cpus().length,
                    machine_free_mem: os.freemem(),
                    machine_total_mem: os.totalmem()
                };
            });
  
            pm2.disconnect();
            callback(metrics);
          });
      });
    }

    monitor() {
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
            callback(metrics);
          });
      });
    }

    instance() {
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
            callback(metrics);
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
