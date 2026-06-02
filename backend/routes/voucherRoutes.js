const express = require('express')

const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GENERATE RANDOM CODE
|--------------------------------------------------------------------------
*/

const generateCode = () => {

  const chars =
    'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'

  let result = ''

  for (let i = 0; i < 8; i++) {

    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    )

  }

  return result

}

/*
|--------------------------------------------------------------------------
| GET VOUCHERS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    const vouchers =
      await prisma.voucher.findMany({

        orderBy: {
          id: 'desc',
        },

      })

    res.json(vouchers)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Failed get vouchers',

    })

  }

})

/*
|--------------------------------------------------------------------------
| CREATE VOUCHER
|--------------------------------------------------------------------------
*/

router.post('/', async (req, res) => {

  try {

    const {

      packageName,
      duration,
      price,

    } = req.body

    const voucher =
      await prisma.voucher.create({

        data: {

          code: generateCode(),

          packageName,

          duration,

          price: Number(price),

          status: 'ACTIVE',

        },

      })

    res.json(voucher)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Create voucher failed',

    })

  }

})

/*
|--------------------------------------------------------------------------
| DELETE VOUCHER
|--------------------------------------------------------------------------
*/

router.delete('/:id', async (req, res) => {

  try {

    const id = Number(req.params.id)

    await prisma.voucher.delete({

      where: { id },

    })

    res.json({

      success: true,

      message: 'Voucher deleted',

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Delete voucher failed',

    })

  }

})

module.exports = router