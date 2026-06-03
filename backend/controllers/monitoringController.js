const { getConnection } = require('../services/mikrotikService')

const getRealtimeData = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const resource =
      await conn.write('/system/resource/print')

    const pppActive =
      await conn.write('/ppp/active/print')

    const cpu =
      resource[0]['cpu-load']

    const totalMemory =
      Number(resource[0]['total-memory'])

    const freeMemory =
      Number(resource[0]['free-memory'])

    const ram =
      Math.round(
        ((totalMemory - freeMemory) /
          totalMemory) * 100
      )

    const onlineUsers =
      pppActive.length

    res.json({

      success: true,

      routerName:
        resource[0]['board-name'],

      cpu,

      ram,

      onlineUsers

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'Failed get monitoring data'

    })

  } finally {

    if (conn)
      conn.close()

  }

}

module.exports = {
  getRealtimeData
}