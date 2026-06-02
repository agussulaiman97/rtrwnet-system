const { RouterOSAPI } = require('node-routeros')

/*
|--------------------------------------------------------------------------
| CONNECT MIKROTIK
|--------------------------------------------------------------------------
*/

const connectMikrotik = async () => {

  try {

    const conn = new RouterOSAPI({

      host: process.env.MIKROTIK_HOST,

      user: process.env.MIKROTIK_USER,

      password: process.env.MIKROTIK_PASS,

      port: process.env.MIKROTIK_PORT,

    })

    await conn.connect()

    return conn

  } catch (error) {

    console.log(error)

    throw error

  }

}

/*
|--------------------------------------------------------------------------
| GET HOTSPOT USERS
|--------------------------------------------------------------------------
*/

const getHotspotUsers = async () => {

  const conn = await connectMikrotik()

  try {

    const users =
      await conn.write(
        '/ip/hotspot/active/print'
      )

    return users

  } catch (error) {

    console.log(error)

    return []

  } finally {

    conn.close()

  }

}

/*
|--------------------------------------------------------------------------
| GET PPP ACTIVE
|--------------------------------------------------------------------------
*/

const getPPPoEUsers = async () => {

  const conn = await connectMikrotik()

  try {

    const users =
      await conn.write(
        '/ppp/active/print'
      )

    return users

  } catch (error) {

    console.log(error)

    return []

  } finally {

    conn.close()

  }

}

/*
|--------------------------------------------------------------------------
| DISCONNECT HOTSPOT USER
|--------------------------------------------------------------------------
*/

const disconnectHotspotUser = async (id) => {

  const conn = await connectMikrotik()

  try {

    await conn.write(

      '/ip/hotspot/active/remove',

      [
        `=.id=${id}`,
      ]

    )

    return true

  } catch (error) {

    console.log(error)

    return false

  } finally {

    conn.close()

  }

}

/*
|--------------------------------------------------------------------------
| GET INTERFACE TRAFFIC
|--------------------------------------------------------------------------
*/

const getInterfaces = async () => {

  const conn = await connectMikrotik()

  try {

    const interfaces =
      await conn.write(
        '/interface/print'
      )

    return interfaces

  } catch (error) {

    console.log(error)

    return []

  } finally {

    conn.close()

  }

}

module.exports = {

  getHotspotUsers,

  getPPPoEUsers,

  disconnectHotspotUser,

  getInterfaces,

}