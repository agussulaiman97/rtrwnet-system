const express = require('express')

const router = express.Router()

/*
|--------------------------------------------------------------------------
| MONITORING REALTIME API
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | DUMMY REALTIME DATA
    |--------------------------------------------------------------------------
    */

    const monitoring = {

      routerName: 'MikroTik RB4011',

      routerStatus: 'ONLINE',

      cpuUsage:
        Math.floor(Math.random() * 50) + 10,

      ramUsage:
        Math.floor(Math.random() * 70) + 20,

      onlineUsers:
        Math.floor(Math.random() * 150) + 50,

      offlineUsers:
        Math.floor(Math.random() * 20),

      uploadTraffic:
        Math.floor(Math.random() * 200) + ' Mbps',

      downloadTraffic:
        Math.floor(Math.random() * 500) + ' Mbps',

      uptime: '15 Days 12 Hours',

      lastUpdate: new Date(),

    }

    res.json(monitoring)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Monitoring API Error',

    })

  }

})

module.exports = router