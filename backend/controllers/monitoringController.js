const { getConnection } = require('../services/mikrotikService')

const getMonitoring = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const resource =
      await conn.write('/system/resource/print')

    const identity =
      await conn.write('/system/identity/print')

    const pppActive =
      await conn.write('/ppp/active/print')

    const interfaces =
      await conn.write('/interface/print')

    const ether1 =
      interfaces.find(
        item =>
          item.name === 'ether1'
      )

    res.json({

      routerName:
        identity[0]?.name || 'MikroTik',

      routerStatus:
        'ONLINE',

      cpuUsage:
        Number(
          resource[0]['cpu-load']
        ),

      ramUsage:
        Math.round(

          (
            (
              Number(
                resource[0]['total-memory']
              ) -

              Number(
                resource[0]['free-memory']
              )

            )

            /

            Number(
              resource[0]['total-memory']
            )

          )

          * 100

        ),

      uptime:
        resource[0].uptime,

      onlineUsers:
        pppActive.length,

      offlineUsers:
        0,

      downloadTraffic:
        ether1?.['rx-byte']
          ? (
              Number(
                ether1['rx-byte']
              ) /
              1024 /
              1024
            ).toFixed(2) + ' MB'
          : '0 MB',

      uploadTraffic:
        ether1?.['tx-byte']
          ? (
              Number(
                ether1['tx-byte']
              ) /
              1024 /
              1024
            ).toFixed(2) + ' MB'
          : '0 MB',

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

  } finally {

    if (conn) {

      try {

        conn.close()

      } catch {}

    }

  }

}

module.exports = {
  getMonitoring
}