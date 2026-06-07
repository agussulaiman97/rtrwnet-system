const express = require('express')
const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GET BILLINGS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    const billings = await prisma.billing.findMany({

      include: {
        Customer: true
      },

      orderBy: {
        id: 'desc'
      }

    })

    res.json(billings)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed get billings'
    })

  }

})

/*
|--------------------------------------------------------------------------
| GENERATE BILLING
|--------------------------------------------------------------------------
*/

router.post('/generate', async (req, res) => {

  try {

    const customers =
      await prisma.customer.findMany()

    for (const customer of customers) {

      await prisma.billing.create({

        data: {

          customerId: customer.id,

          amount: customer.bill,

          dueDate: new Date(),

          status: 'UNPAID'

        }

      })

    }

    res.json({

      success: true,

      message: 'Invoice generated'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Generate failed'
    })

  }

})

/*
|--------------------------------------------------------------------------
| PAY BILLING
|--------------------------------------------------------------------------
*/

router.put('/pay/:id', async (req, res) => {

  try {

    const id =
      Number(req.params.id)

    const billing =
      await prisma.billing.update({

        where: { id },

        data: {

          status: 'PAID',

          paidAt: new Date()

        }

      })

    res.json(billing)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Payment failed'
    })

  }

})

module.exports = router