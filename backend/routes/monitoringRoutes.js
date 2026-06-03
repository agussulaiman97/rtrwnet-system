const express = require('express')

const router = express.Router()

const {
  getRealtimeData
} = require(
  '../controllers/monitoringController'
)

router.get(
  '/',
  getRealtimeData
)

module.exports = router