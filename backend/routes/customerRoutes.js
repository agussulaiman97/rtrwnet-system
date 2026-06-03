const express = require('express')

const router = express.Router()

const prisma = require('../utils/prisma')

/*
|--------------------------------------------------------------------------
| GET ALL CUSTOMERS
|--------------------------------------------------------------------------
*/

router.get('/', async (req, res) => {

  try {

    const customers =
      await prisma.customer.findMany({

        include: {
          packageRel: true
        },

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

/*
|--------------------------------------------------------------------------
| CREATE CUSTOMER
|--------------------------------------------------------------------------
*/

router.post('/', async (req, res) => {

  try {

    const {
      name,
      phone,
      address,
      packageId
    } = req.body

    const selectedPackage =
      await prisma.package.findUnique({
        where: {
          id: Number(packageId)
        }
      })

    if (!selectedPackage) {
      return res.status(400).json({
        error: 'Package not found'
      })
    }

    const customer =
      await prisma.customer.create({
        data: {
          name,
          phone,
          address,
          packageId: Number(packageId),
          bill: selectedPackage.price,
          status: 'ACTIVE'
        }
      })

    res.json(customer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Create customer failed',
      message: error.message
    })

  }

})

    res.json(customer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Create customer failed'
    })

  }

})

/*
|--------------------------------------------------------------------------
| UPDATE CUSTOMER
|--------------------------------------------------------------------------
*/

router.put('/:id', async (req, res) => {

  try {

    const id = Number(req.params.id)

    const {
      name,
      phone,
      address,
      packageId,
      status
    } = req.body

    const selectedPackage =
      await prisma.package.findUnique({

        where: {
          id: Number(packageId)
        }

      })

    const customer =
      await prisma.customer.update({

        where: {
          id
        },

        data: {

          name,

          phone,

          address,

          packageId: Number(packageId),

          bill: selectedPackage.price,

          status

        }

      })

    res.json(customer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Update customer failed'
    })

  }

})

/*
|--------------------------------------------------------------------------
| DELETE CUSTOMER
|--------------------------------------------------------------------------
*/

router.delete('/:id', async (req, res) => {

  try {

    const id = Number(req.params.id)

    await prisma.customer.delete({

      where: {
        id
      }

    })

    res.json({

      success: true,

      message: 'Customer deleted'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: 'Delete customer failed'
    })

  }

})

module.exports = router