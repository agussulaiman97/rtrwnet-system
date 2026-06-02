const express = require('express')

const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GET SETTINGS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    let settings =
      await prisma.setting.findFirst()

    /*
    |--------------------------------------------------------------------------
    | AUTO CREATE DEFAULT
    |--------------------------------------------------------------------------
    */

    if (!settings) {

      settings =
        await prisma.setting.create({

          data: {

            ispName: 'RTRWNET SYSTEM',

          },

        })

    }

    res.json(settings)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Failed get settings',

    })

  }

})

/*
|--------------------------------------------------------------------------
| UPDATE SETTINGS
|--------------------------------------------------------------------------
*/

router.put('/:id', async (req, res) => {

  try {

    const id = Number(req.params.id)

    const settings =
      await prisma.setting.update({

        where: { id },

        data: req.body,

      })

    res.json(settings)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Update settings failed',

    })

  }

})

module.exports = router