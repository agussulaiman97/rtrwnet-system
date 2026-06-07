const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {

  res.json({

    success: true,

    routerName: 'MikroTik',

    routerStatus: 'ONLINE',

    cpuUsage: 0,

    ramUsage: 0,

    onlineUsers: 0,

    offlineUsers: 0,

    uptime: '-',

    downloadTraffic: '0 Mbps',

    uploadTraffic: '0 Mbps',

    lastUpdate: new Date()

  })

})

module.exports = router