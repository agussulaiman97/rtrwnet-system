const { RouterOSClient } = require('routeros-client')

async function getConnection() {

  const client =
    new RouterOSClient({

      host: process.env.MIKROTIK_HOST,

      user: process.env.MIKROTIK_USER,

      password: process.env.MIKROTIK_PASS,

      port: Number(
        process.env.MIKROTIK_PORT || 8728
      )

    })

  const conn =
    await client.connect()

  return conn

}

module.exports = {
  getConnection
}