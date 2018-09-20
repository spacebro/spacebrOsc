const osc = require('osc')

const udpPort = new osc.UDPPort({
  remoteAddress: '127.0.0.1',
  remotePort: 6060,
  metadata: true
})

udpPort.open()

udpPort.on('ready', function () {
  // send message every 2s.
  setInterval(() => {
    udpPort.send({
      address: '/osc-emitter-tool',
      args: [{
        type: 's',
        value: 'osc test message'
      }, {
        type: 'i',
        value: Math.round(Math.random() * 100)
      }]
    }, '127.0.0.1', 6060)
  }, 2000)
  // send bundles every 5s.
  setInterval(() => {
    udpPort.send({
      timeTag: osc.timeTag(),
      packets: [{
        address: '/osc-emitte-bundle/float',
        args: [{ type: 'f', value: Math.random() }]
      }, {
        address: '/osc-emitte-bundle/int',
        args: [{ type: 'i', value: Math.round(Math.random() * 44100) }]
      }]
    })
  }, 5000)
})
