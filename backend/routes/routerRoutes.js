const express = require('express')

const router = express.Router()

/*
|--------------------------------------------------------------------------
| GET ROUTERS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    const routers = [

      {
        id: 1,

        name: 'MikroTik RB4011',

        ip: '192.168.88.1',

        status: 'ONLINE',

        cpu: Math.floor(Math.random() * 50) + 10,

        ram: Math.floor(Math.random() * 70) + 20,

        uptime: '15 Days',

        hotspot: true,
      },

      {
        id: 2,

        name: 'MikroTik CCR1009',

        ip: '192.168.10.1',

        status: 'ONLINE',

        cpu: Math.floor(Math.random() * 50) + 10,

        ram: Math.floor(Math.random() * 70) + 20,

        uptime: '22 Days',

        hotspot: false,
      },

    ]

    res.json(routers)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Router API Error',

    })

  }

})

/*
|--------------------------------------------------------------------------
| REBOOT ROUTER
|--------------------------------------------------------------------------
*/

router.post('/reboot/:id', async (req, res) => {

  try {

    const id = req.params.id

    res.json({

      success: true,

      message: `Router ${id} reboot success`,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Reboot failed',

    })

  }

})

/*
|--------------------------------------------------------------------------
| ENABLE HOTSPOT
|--------------------------------------------------------------------------
*/

router.post('/hotspot/enable/:id', async (req, res) => {

  try {

    res.json({

      success: true,

      message: 'Hotspot enabled',

    })

  } catch (error) {

    console.log(error)

  }

})

/*
|--------------------------------------------------------------------------
| DISABLE HOTSPOT
|--------------------------------------------------------------------------
*/

router.post('/hotspot/disable/:id', async (req, res) => {

  try {

    res.json({

      success: true,

      message: 'Hotspot disabled',

    })

  } catch (error) {

    console.log(error)

  }

})

module.exports = router