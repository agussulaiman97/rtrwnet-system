const express = require('express')

const router = express.Router()

const { getConnection } = require('../services/mikrotikService')

| /*                                                                         |
| -------------------------------------------------------------------------- |
| GET HOTSPOT ACTIVE USERS                                                   |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.get('/hotspot', async (req, res) => {

let conn

try {

```
conn = await getConnection()

const users =
  await conn.menu('/ip/hotspot/active').get()

res.json(users)
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Failed get hotspot users'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| GET PPP ACTIVE USERS                                                       |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.get('/pppoe', async (req, res) => {

let conn

try {

```
conn = await getConnection()

const users =
  await conn.menu('/ppp/active').get()

res.json(users)
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Failed get PPP users'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| GET PPP SECRETS                                                            |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.get('/ppp-secrets', async (req, res) => {

let conn

try {

```
conn = await getConnection()

const secrets =
  await conn.menu('/ppp/secret').get()

res.json(secrets)
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Failed get PPP secrets'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| GET INTERFACES                                                             |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.get('/interfaces', async (req, res) => {

let conn

try {

```
conn = await getConnection()

const interfaces =
  await conn.menu('/interface').get()

res.json(interfaces)
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Failed get interfaces'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| DISCONNECT HOTSPOT USER                                                    |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.delete('/hotspot/:id', async (req, res) => {

let conn

try {

```
conn = await getConnection()

await conn.write(

  '/ip/hotspot/active/remove',

  [
    `=.id=${req.params.id}`
  ]

)

res.json({

  success: true,

  message: 'User disconnected'

})
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Disconnect failed'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| DISABLE PPP SECRET                                                         |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.post('/ppp-disable/:id', async (req, res) => {

let conn

try {

```
conn = await getConnection()

await conn.write(

  '/ppp/secret/set',

  [
    `=.id=${req.params.id}`,
    '=disabled=yes'
  ]

)

res.json({

  success: true,

  message: 'PPP disabled'

})
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Disable PPP failed'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| ENABLE PPP SECRET                                                          |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.post('/ppp-enable/:id', async (req, res) => {

let conn

try {

```
conn = await getConnection()

await conn.write(

  '/ppp/secret/set',

  [
    `=.id=${req.params.id}`,
    '=disabled=no'
  ]

)

res.json({

  success: true,

  message: 'PPP enabled'

})
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Enable PPP failed'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

| /*                                                                         |
| -------------------------------------------------------------------------- |
| REBOOT ROUTER                                                              |
| -------------------------------------------------------------------------- |
| */                                                                         |

router.post('/reboot', async (req, res) => {

let conn

try {

```
conn = await getConnection()

await conn.write('/system/reboot')

res.json({

  success: true,

  message: 'Router reboot command sent'

})
```

} catch (error) {

```
console.log(error)

res.status(500).json({

  success: false,

  message: 'Failed reboot router'

})
```

} finally {

```
if (conn) {

  try {
    conn.close()
  } catch (e) {}

}
```

}

})

module.exports = router
