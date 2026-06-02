const express = require('express')

const router = express.Router()

router.post('/login', (req, res) => {

  const { username, password } = req.body

  if (
    username === 'admin' &&
    password === 'admin123'
  ) {

    return res.json({
      success: true,
      token: 'RTRWNET_TOKEN',
      user: {
        username: 'admin',
        role: 'ADMIN',
      },
    })

  }

  return res.status(401).json({
    success: false,
    message: 'Username atau password salah',
  })

})

module.exports = router