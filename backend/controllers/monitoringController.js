const { getConnection } = require('../services/mikrotikService')

const getMonitoring = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const identity =
      await conn.menu('/system/identity').get()

    const resource =
      await conn.menu('/system/resource').get()

    const activeUsers =
      await conn.menu('/ppp/active').get()

    const router = resource[0]

    const ramUsage =
      Math.round(
        (
          (router.totalMemory - router.freeMemory)
          /
          router.totalMemory
        ) * 100
      )

    res.json({

      routerName:
        identity[0]?.name || 'MikroTik',

      routerStatus:
        'ONLINE',

      cpuUsage:
        router.cpuLoad || 0,

      ramUsage,

      onlineUsers:
        activeUsers.length,

      offlineUsers:
        0,

      downloadTraffic:
        'Realtime Pending',

      uploadTraffic:
        'Realtime Pending',

      uptime:
        router.uptime,

      lastUpdate:
        new Date()

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'Failed get monitoring data'

    })

  }

}

module.exports = {
  getMonitoring
}