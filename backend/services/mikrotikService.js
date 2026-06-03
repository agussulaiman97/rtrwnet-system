const { RouterOSAPI } = require('node-routeros')

const getConnection = async () => {

  const conn = new RouterOSAPI({

    host: process.env.MIKROTIK_HOST,

    user: process.env.MIKROTIK_USER,

    password: process.env.MIKROTIK_PASS,

    port: process.env.MIKROTIK_PORT || 8728

  })

  await conn.connect()

  return conn

}

module.exports = {
  getConnection
}