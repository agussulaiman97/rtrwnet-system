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
        Customer: true,
      },

      orderBy: {
        id: 'desc',
      },

    })

    res.json(billings)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed get billings',
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

    const Customers = await prisma.Customer.findMany()

    for (const Customer of Customers) {

      await prisma.billing.create({

        data: {

          CustomerId: Customer.id,

          amount: Customer.bill,

          dueDate: new Date(),

          status: 'UNPAID',

        },

      })

    }

    res.json({
      success: true,
      message: 'Invoice generated',
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Generate failed',
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

    const id = Number(req.params.id)

    const billing = await prisma.billing.update({

      where: { id },

      data: {

        status: 'PAID',

        paidAt: new Date(),

      },

    })

    res.json(billing)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Payment failed',
    })

  }

})

/*
|--------------------------------------------------------------------------
| SUSPEND Customer
|--------------------------------------------------------------------------
*/

router.put('/suspend/:CustomerId', async (req, res) => {

  try {

    const CustomerId = Number(req.params.CustomerId)

    const Customer = await prisma.Customer.update({

      where: { id: CustomerId },

      data: {

        status: 'SUSPEND',

      },

    })

    res.json(Customer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Suspend failed',
    })

  }

})

module.exports = router