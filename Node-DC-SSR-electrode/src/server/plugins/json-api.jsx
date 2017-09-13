
import os from "os";
import {config} from "electrode-confippet";

const plugin = {};

plugin.register = function (server, options, next) {

  function getmeminfo(req, reply) {
    var afterMemusage = process.memoryUsage();
    var memoryInfo = {};
    ['rss', 'heapTotal', 'heapUsed'].forEach(function(key) {
        memoryInfo[key] = afterMemusage[key]/(1024 * 1024).toFixed(2);
      });
    reply({memoryInfo});
  }


  server.route({
      method: "GET",
      path: "/getmeminfo",
      handler: getmeminfo
    });

  function getcpuinfo(req, reply) {
    const cpus = os.cpus();
    reply({
      hw: {
        architecture: os.arch(),
        model: cpus[0]['model'],
        speed: cpus[0]['speed'],
        sys: cpus[0]['times']['sys'],
        irq: cpus[0]['times']['irq'],
        idle: cpus[0]['times']['idle'],
        user: cpus[0]['times']['user'],
        nice: cpus[0]['times']['nice'],
        endianness: os.endianness(),
        totalmem: os.totalmem(),
        freemem: os.freemem()
      },
      sw: {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        uptime: os.uptime()
      },
      appName: config.app.app_mode,
      version: process.versions
    });
  }

  server.route({
      method: "GET",
      path: "/getcpuinfo",
      handler: getcpuinfo
    });

  next();
};

plugin.register.attributes = {
  name: "JSONAPIPlugin",
  version: "0.0.1"
};

export default plugin;
