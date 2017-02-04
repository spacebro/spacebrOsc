'use strict'

const spacebroClient = require('spacebro-client')

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

module.exports = { connectSpacebro, onSpacebro, emitSpacebro }
