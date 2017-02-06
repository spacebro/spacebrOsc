'use strict'

const spacebroClient = require('spacebro-client')

const osc = require('osc')

let udpPort = {}

/**
 * connects to a spacebro server instance
 * @param  {String} address [description]
 * @param  {Number} port    [description]
 * @param  {Object} spacebroConfig  [description]
 * @return {void}
 */
const connectSpacebro = (address, port, spacebroConfig) => {
  spacebroClient.connect(address, port, spacebroConfig)
}

const onSpacebro = (eventName, cb) => {
  spacebroClient.on(eventName, cb)
}

const emitSpacebro = (eventName, data) => {
  spacebroClient.emit(eventName, data)
}

const connectOSC = (OSCConfig) => {
  udpPort = new osc.UDPPort(OSCConfig)
  udpPort.open()
}

const onOSCBundle = (cb) => {
  udpPort.on('bundle', (oscBundle) => {
    cb(oscBundle)
  })
}

const onOSCMessage = (cb) => {
  udpPort.on('message', (oscMessage) => {
    cb(oscMessage)
  })
}

const forwardOSCToSpacebro = () => {
  udpPort.on('message', (oscMessage) => {
    const datas = (oscMessage.args.length > 1) ? oscMessage.args : oscMessage.args[0]
    spacebroClient.emit(oscMessage.address, datas)
  })
}

module.exports = { connectSpacebro, onSpacebro, emitSpacebro, connectOSC, onOSCBundle, onOSCMessage, forwardOSCToSpacebro }
