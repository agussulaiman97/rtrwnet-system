const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {

  res.json({

    success: true,

    routerName: 'MikroTik',

    status: 'ONLINE',

    uptime: '-',

    cpu: 0,

    memory: 0,

    onlineUsers: 0,

    download: 0,

    upload: 0

  })

})

module.exports = router