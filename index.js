'use strict'

const settings = require('standard-settings')

console.log(settings)

const { SpacebroClient } = require('spacebro-client')
const osc = require('osc')

const client = new SpacebroClient({
  host: settings.get('spacebro:host') || '127.0.0.1',
  port: settings.get('spacebro:port') || 8888,
  channelName: settings.get('spacebro:channelName') || 'spacebrosc',
  client: {
    name: 'spacebrosc-transmitter',
    description: 'osc-to-spacebro utility'
  },
  verbose: settings.get('verbose') || true
})

const udpPort = new osc.UDPPort({
  localAddress: settings.get('osc:localAddress') || '0.0.0.0',
  localPort: settings.get('osc:localPort') || 6060,
  metadata: true
})

udpPort.on('bundle', function (oscBundle, timeTag, info) {
  if (settings.get('verbose')) {
    console.log('--- bundle')
    console.log(oscBundle)
    console.log(info)
  }
  oscBundle.packets.forEach(packet => {
    client.emit(packet.address.slice(1), packet.args)
  })
})

udpPort.on('message', function (oscMessage, timeTag, info) {
  if (settings.get('verbose')) {
    console.log('--- message')
    console.log(oscMessage)
    console.log(info)
  }
  client.emit(oscMessage.address.slice(1), oscMessage.args)
})

udpPort.open()
