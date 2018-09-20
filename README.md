# spacebrOsc

Converts OSC bundles to spacebro events.

### Usage

spacebrOsc is meant to be used as is. You install it, provide a custom configuration file and run it.

##### Install
```sh
$ git clone git@github.com:spacebro/spacebrOsc.git
$ cd spacebrOsc/
$ npm i
```

##### Eventually use custom settings
```sh
$ cp settings/settings.default.js settings/settings.js
$ vim settings/settings.js
```

##### Run
```sh
$ node index.js
```

### Settings

```js
{
  "verbose": false, // does spacebrOsc logs everything or not
  "spacebro": {
    "host": "127.0.0.1", // host of your spacebro server
    "port": 8888, // port of your spacebro server
    "channelName": "spacebrosc" // channel name you want to use (optionnal)
  },
  "osc": {
    "localAddress": "0.0.0.0", // on which local ip do you want to open an UDP socket for your OSC sending app to connect
    "localPort": 12345 // on which port you open that UDP socket
  }
}
```

### Example

If you don't have an OSC sending app, you can test with the `tools/osc-emitter.js` script. Just make sure the settings matches.
