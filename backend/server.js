require('dotenv').config()

const express = require('express')
const cors = require('cors')

/*
|--------------------------------------------------------------------------
| IMPORT ROUTES
|--------------------------------------------------------------------------
*/

const customerRoutes = require('./routes/customerRoutes')
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const monitoringRoutes = require('./routes/monitoringRoutes')
const routerRoutes = require('./routes/routerRoutes')
const voucherRoutes = require('./routes/voucherRoutes')
const reportRoutes = require('./routes/reportRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const mikrotikRoutes = require('./routes/mikrotikRoutes')
const billingRoutes = require('./routes/billingRoutes')

/*
|--------------------------------------------------------------------------
| CREATE APP
|--------------------------------------------------------------------------
*/

const app = express()

/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use('/api/customers', customerRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/monitoring', monitoringRoutes)
app.use('/api/routers', routerRoutes)
app.use('/api/vouchers', voucherRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/mikrotik', mikrotikRoutes)
app.use('/api/billings', billingRoutes)

/*
|--------------------------------------------------------------------------
| ROOT API
|--------------------------------------------------------------------------
*/

app.get('/', (req, res) => {

  res.json({

    success: true,

    message: 'RTRWNET API RUNNING',

    version: '1.0.0',

    author: 'Agus Sulaiman',

  })

})

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get('/health', (req, res) => {

  res.status(200).json({

    success: true,

    status: 'SERVER ONLINE',

    timestamp: new Date(),

  })

})

/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: 'API Route Not Found',

  })

})

/*
|--------------------------------------------------------------------------
| GLOBAL ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((error, req, res, next) => {

  console.log('GLOBAL ERROR =>', error)

  res.status(500).json({

    success: false,

    message: error.message || 'Internal Server Error',

  })

})

/*
|--------------------------------------------------------------------------
| SERVER START
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

  console.log(`

========================================
RTRWNET BACKEND RUNNING
========================================
PORT : ${PORT}
URL  : http://localhost:${PORT}
HEALTH CHECK :
http://localhost:${PORT}/health
========================================

  `)

})