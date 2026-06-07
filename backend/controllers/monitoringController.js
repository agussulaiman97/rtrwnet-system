const { getConnection } = require('../services/mikrotikService')

const getMonitoring = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const identity =
      await conn.menu('/system/identity').get()

    const resource =
      await conn.menu('/system/resource').get()

    const router = resource[0]

    const totalMemory =
      Number(router.totalMemory || 0)

    const freeMemory =
      Number(router.freeMemory || 0)

    const ramUsage =
      totalMemory > 0
        ? Math.round(
            ((totalMemory - freeMemory) /
              totalMemory) * 100
          )
        : 0

    res.json({

      routerName:
        identity?.[0]?.name ||
        'MikroTik',

      routerStatus:
        'ONLINE',

      cpuUsage:
        Number(router.cpuLoad || 0),

      ramUsage,

      onlineUsers: 0,

      offlineUsers: 0,

      downloadTraffic:
        'Connected',

      uploadTraffic:
        'Connected',

      uptime:
        router.uptime || '-',

      lastUpdate:
        new Date()

    })

  } catch (error) {

    console.log(
      'MONITORING ERROR:',
      error
    )

    res.status(500).json({

      success: false,

      message:
        'Failed get monitoring data'

    })

  } finally {

    if (conn) {

      try {

        conn.close()

      } catch (e) {}

    }

  }

}

module.exports = {
  getMonitoring
}