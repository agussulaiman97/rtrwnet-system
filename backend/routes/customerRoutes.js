const express = require('express')
const router = express.Router()

const prisma = require('../utils/prisma')

router.get('/', async (req, res) => {

  try {

    const customers =
      await prisma.customer.findMany({

        orderBy: {
          id: 'desc'
        }

      })

    res.json(customers)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Failed get customers'
    })

  }

})

module.exports = router