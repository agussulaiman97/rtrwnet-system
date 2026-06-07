const { getConnection } = require('../services/mikrotikService')

const getMonitoring = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const identity =
      await conn.menu('/system/identity').get()

    const resource =
      await conn.menu('/system/resource').get()

    let activeUsers = []

    try {

      activeUsers =
        await conn.menu('/ppp/active').get()

    } catch (e) {}

    res.json({

      routerName:
        identity?.[0]?.name || 'MikroTik',

      routerStatus: 'ONLINE',

      cpuUsage:
        Number(
          resource?.[0]?.['cpu-load']
        ) || 0,

      ramUsage: 0,

      onlineUsers:
        activeUsers.length,

      offlineUsers: 0,

      uptime:
        resource?.[0]?.uptime || '-',

      downloadTraffic:
        'Connected',

      uploadTraffic:
        'Connected',

      lastUpdate:
        new Date()

    })

  } catch (error) {

    console.log(error)

    res.json({

      routerName: 'MikroTik',

      routerStatus: 'OFFLINE',

      cpuUsage: 0,

      ramUsage: 0,

      onlineUsers: 0,

      offlineUsers: 0,

      uptime: '-',

      downloadTraffic: 'Disconnected',

      uploadTraffic: 'Disconnected',

      lastUpdate: new Date()

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