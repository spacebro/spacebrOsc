'use strict'

const spacebrOsc = require('../.')

spacebrOsc.connectSpacebro('localhost', 8888, {
  clientName: 'spacebrOsc',
  verbose: true
})
spacebrOsc.connectOSC({
  localAddress: '0.0.0.0',
  localPort: 12345
})

spacebrOsc.forwardOSCToSpacebro()
