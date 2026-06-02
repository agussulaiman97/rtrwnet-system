const express = require('express')

const router = express.Router()

const {

  getHotspotUsers,

  getPPPoEUsers,

  disconnectHotspotUser,

  getInterfaces,

} = require('../mikrotik/mikrotikService')

/*
|--------------------------------------------------------------------------
| HOTSPOT USERS
|--------------------------------------------------------------------------
*/

router.get('/hotspot', async (req, res) => {

  try {

    const users =
      await getHotspotUsers()

    res.json(users)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Failed get hotspot users',

    })

  }

})

/*
|--------------------------------------------------------------------------
| PPP ACTIVE
|--------------------------------------------------------------------------
*/

router.get('/pppoe', async (req, res) => {

  try {

    const users =
      await getPPPoEUsers()

    res.json(users)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Failed get PPP users',

    })

  }

})

/*
|--------------------------------------------------------------------------
| INTERFACES
|--------------------------------------------------------------------------
*/

router.get('/interfaces', async (req, res) => {

  try {

    const interfaces =
      await getInterfaces()

    res.json(interfaces)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Failed get interfaces',

    })

  }

})

/*
|--------------------------------------------------------------------------
| DISCONNECT USER
|--------------------------------------------------------------------------
*/

router.delete(
  '/hotspot/:id',
  async (req, res) => {

    try {

      const success =
        await disconnectHotspotUser(
          req.params.id
        )

      res.json({

        success,

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

      })

    }

  }
)

module.exports = router