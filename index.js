'use strict'

const settings = require('standard-settings')

const { SpacebroClient } = require('spacebro-client')
const osc = require('osc')

const customEvent = settings.get('useCustomEventName')

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
    const event = customEvent || packet.address.slice(1)
    customEvent && packet.args.push({ OSCaddress: packet.address })
    client.emit(event, packet.args)
  })
})

udpPort.on('message', function (oscMessage, timeTag, info) {
  if (settings.get('verbose')) {
    console.log('--- message')
    console.log(oscMessage)
    console.log(info)
  }
  const event = customEvent || oscMessage.address.slice(1)
  customEvent && oscMessage.args.push({ OSCaddress: oscMessage.address })
  client.emit(event, oscMessage.args)
})

udpPort.open()
