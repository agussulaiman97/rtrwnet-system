const getMonitoring = async (req, res) => {

  try {

    res.json({

      routerName: 'Mikrotik',

      routerStatus: 'ONLINE',

      cpuUsage: 12,

      ramUsage: 35,

      onlineUsers: 1,

      offlineUsers: 0,

      downloadTraffic: '15 Mbps',

      uploadTraffic: '3 Mbps',

      uptime: '1d 5h',

      lastUpdate: new Date()

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Monitoring Failed'

    })

  }

}

module.exports = {

  getMonitoring

}