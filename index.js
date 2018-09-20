'use strict'

const { SpacebroClient } = require('spacebro-client')

const client = new SpacebroClient({
  host: '127.0.0.1',
  port: 8888,
  channelName: 'spacebrosc',
  client: {
    name: 'spacebrosc-transmitter',
    description: 'osc-to-spacebro utility'
  }
})

const osc = require('osc')

const udpPort = new osc.UDPPort({
  localAddress: '127.0.0.1',
  localPort: 6060,
  metadata: true
})

udpPort.on('bundle', function (oscBundle, timeTag, info) {
  console.log('--- bundle')
  console.log(oscBundle)
  console.log(info)
  oscBundle.packets.forEach(packet => {
    client.emit(packet.address.slice(1), packet.args)
  })
})

udpPort.on('message', function (oscMessage, timeTag, info) {
  console.log('--- message')
  console.log(oscMessage)
  console.log(info)
  client.emit(oscMessage.address.slice(1), oscMessage.args)
  /*
  { address: '/osc-emitter-tool', args: [ { type: 's', value: 'default' }, { type: 'i', value: 1 } ] }
  { address: '127.0.0.1', family: 'IPv4', port: 57121, size: 36 }
   */
})

udpPort.open()

// client.on('inFoo', (data) => console.log('inFoo', data))
// client.emit('outBar', { do: stuff})
