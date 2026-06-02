const express = require('express')

const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GET DASHBOARD STATS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | TOTAL CUSTOMER
    |--------------------------------------------------------------------------
    */

    const totalCustomer =
      await prisma.customer.count()

    /*
    |--------------------------------------------------------------------------
    | ACTIVE CUSTOMER
    |--------------------------------------------------------------------------
    */

    const activeCustomer =
      await prisma.customer.count({

        where: {
          status: 'ACTIVE',
        },

      })

    /*
    |--------------------------------------------------------------------------
    | SUSPEND CUSTOMER
    |--------------------------------------------------------------------------
    */

    const suspendCustomer =
      await prisma.customer.count({

        where: {
          status: {
            not: 'ACTIVE',
          },
        },

      })

    /*
    |--------------------------------------------------------------------------
    | TOTAL INCOME
    |--------------------------------------------------------------------------
    */

    const customers =
      await prisma.customer.findMany()

    const totalIncome =
      customers.reduce(

        (total, item) => {

          return total + Number(item.bill || 0)

        },

        0

      )

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    res.json({

      totalCustomer,

      activeCustomer,

      suspendCustomer,

      totalIncome,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Dashboard API Error',

    })

  }

})

module.exports = router