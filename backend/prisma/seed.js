const prisma = require('../utils/prisma')

async function main() {

  const count =
    await prisma.customer.count()

  if (count > 0) {
    console.log('Customer already exists')
    return
  }

  await prisma.customer.create({

    data: {

      name: 'Agus',
      phone: '08123456789',
      address: 'Jakarta',
      package: '100 Mbps',
      bill: 350000,
      status: 'ACTIVE'

    }

  })

  console.log('Seed success')
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })