require('dotenv').config()

const { getConnection } =
require('./services/mikrotikService')

async function test() {

  const conn =
    await getConnection()

  const active =
    await conn.menu('/ppp/active').get()

  console.log(active)

  process.exit()
}

test()
