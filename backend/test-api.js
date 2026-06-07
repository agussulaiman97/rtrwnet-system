const net = require('net')

const client = net.createConnection({
  host: '10.200.200.2',
  port: 8728
})

client.on('connect', () => {
  console.log('API CONNECTED')
})

client.on('data', data => {
  console.log(data.toString('hex'))
})

client.on('error', err => {
  console.log(err)
})
