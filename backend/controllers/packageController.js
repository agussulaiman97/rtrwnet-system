const prisma = require('../utils/prisma')

const getPackages = async (req, res) => {
  try {

    const packages =
      await prisma.package.findMany({
        orderBy: {
          id: 'desc'
        }
      })

    res.json(packages)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed get packages'
    })
  }
}

const createPackage = async (req, res) => {

  try {

    const {
      name,
      speed,
      price,
      description
    } = req.body

    const data =
      await prisma.package.create({
        data: {
          name,
          speed,
          price: Number(price),
          description
        }
      })

    res.status(201).json(data)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed create package'
    })
  }
}

const updatePackage = async (req, res) => {

  try {

    const { id } = req.params

    const {
      name,
      speed,
      price,
      description
    } = req.body

    const data =
      await prisma.package.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          speed,
          price: Number(price),
          description
        }
      })

    res.json(data)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed update package'
    })
  }
}

const deletePackage = async (req, res) => {

  try {

    const { id } = req.params

    await prisma.package.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      success: true,
      message: 'Package deleted'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed delete package'
    })
  }
}

module.exports = {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage
}