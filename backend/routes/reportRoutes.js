const express = require('express')

const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GET FINANCE REPORT
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | GET BILLINGS
    |--------------------------------------------------------------------------
    */

    const billings =
      await prisma.billing.findMany()

    /*
    |--------------------------------------------------------------------------
    | TOTAL INCOME
    |--------------------------------------------------------------------------
    */

    const totalIncome =
      billings
        .filter(
          (item) =>
            item.status === 'PAID'
        )
        .reduce(

          (total, item) => {

            return total + item.amount

          },

          0

        )

    /*
    |--------------------------------------------------------------------------
    | TOTAL UNPAID
    |--------------------------------------------------------------------------
    */

    const totalUnpaid =
      billings
        .filter(
          (item) =>
            item.status === 'UNPAID'
        )
        .reduce(

          (total, item) => {

            return total + item.amount

          },

          0

        )

    /*
    |--------------------------------------------------------------------------
    | MONTHLY CHART
    |--------------------------------------------------------------------------
    */

    const chart = [

      {
        month: 'Jan',
        income: 12000000,
      },

      {
        month: 'Feb',
        income: 15000000,
      },

      {
        month: 'Mar',
        income: 18000000,
      },

      {
        month: 'Apr',
        income: 17000000,
      },

      {
        month: 'May',
        income: totalIncome,
      },

    ]

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    res.json({

      totalIncome,

      totalUnpaid,

      totalTransactions:
        billings.length,

      chart,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: 'Report API Error',

    })

  }

})

module.exports = router