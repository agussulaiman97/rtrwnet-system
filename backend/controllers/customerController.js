const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/*
|--------------------------------------------------------------------------
| GET ALL CUSTOMERS
|--------------------------------------------------------------------------
*/

exports.getCustomers = async (req, res) => {

  try {

    const customers = await prisma.customer.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    res.json(customers)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Failed get customers',
    })

  }

}

/*
|--------------------------------------------------------------------------
| CREATE CUSTOMER
|--------------------------------------------------------------------------
*/

exports.createCustomer = async (req, res) => {

  try {

    const {
      name,
      phone,
      address,
      package: packageName,
      bill,
    } = req.body

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        address,
        package: packageName,
        bill: Number(bill),
        status: 'ACTIVE',
      },
    })

    res.json({
      success: true,
      customer,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Failed create customer',
    })

  }

}

/*
|--------------------------------------------------------------------------
| UPDATE CUSTOMER
|--------------------------------------------------------------------------
*/

exports.updateCustomer = async (req, res) => {

  try {

    const id = Number(req.params.id)

    const {
      name,
      phone,
      address,
      package: packageName,
      bill,
      status,
    } = req.body

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        address,
        package: packageName,
        bill: Number(bill),
        status,
      },
    })

    res.json({
      success: true,
      customer,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Failed update customer',
    })

  }

}

/*
|--------------------------------------------------------------------------
| DELETE CUSTOMER
|--------------------------------------------------------------------------
*/

exports.deleteCustomer = async (req, res) => {

  try {

    const id = Number(req.params.id)

    await prisma.customer.delete({
      where: {
        id,
      },
    })

    res.json({
      success: true,
      message: 'Customer deleted',
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Failed delete customer',
    })

  }

}