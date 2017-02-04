'use strict'

const spacebrOsc = require('../.')

spacebrOsc.connectSpacebro('localhost', 8888, {
  clientName: 'spacebrOsc',
  verbose: true
})

spacebrOsc.onSpacebro('hello', (data) => {
  console.log('received hello', data)
})

setTimeout(() => { spacebrOsc.emitSpacebro('hello', 'world') }, 3000)
