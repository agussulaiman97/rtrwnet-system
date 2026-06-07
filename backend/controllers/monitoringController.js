const { getConnection } = require('../services/mikrotikService')

const getPPPSecrets = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const secrets =
      await conn.menu('/ppp/secret').get()

    res.json(secrets)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed get PPP Secret'
    })

  } finally {

    if (conn) conn.close()

  }

}

const disablePPP = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const id = req.params.id

    await conn.write(

      '/ppp/secret/set',

      [
        `=.id=${id}`,
        '=disabled=yes'
      ]

    )

    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Disable failed'
    })

  } finally {

    if (conn) conn.close()

  }

}

const enablePPP = async (req, res) => {

  let conn

  try {

    conn = await getConnection()

    const id = req.params.id

    await conn.write(

      '/ppp/secret/set',

      [
        `=.id=${id}`,
        '=disabled=no'
      ]

    )

    res.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Enable failed'
    })

  } finally {

    if (conn) conn.close()

  }

}

module.exports = {
  getPPPSecrets,
  disablePPP,
  enablePPP
}