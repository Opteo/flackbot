const SlackBot = require('slackbots')
const config = require('./config')
const gpio = require('rpi-gpio')
const rpi_pin = 7
var PythonShell = require('python-shell')


const bot = new SlackBot({
    token: config.token,
    name: config.name
})

bot.on('start', function() {

    console.log('bot connected to slack channel')

    bot.on('message', function(event) {

        if(event.type === 'message') {
            return Promise.all([
                bot.getUserById(event.user),
                bot.getChannelById(event.channel)
            ])
            .then(room => {
                const chatter = {
                    channel: room[1].name,
                    username: room[0].profile.first_name,
                    message: event.text,
                    ts: event.ts
                }

                const up_messages = ['flag up', 'hoist the flag', 'moist the flag'];
                const down_messages = ['flag down', 'dehoist the flag', 'demoist the flag'];

                if(up_messages.includes(chatter.message.trim().toLowerCase())) {
                    console.log('executing flag command')
                    bot.postMessageToChannel(chatter.channel, chatter.username + ' executed flag up command :pogchamp:')
                    flagUp()
                }
                if(down_messages.includes(chatter.message.trim().toLowerCase())){
                    console.log('executing flag command')
                    bot.postMessageToChannel(chatter.channel, chatter.username + ' executed flag down command :pogchamp:')
                    flagDown()
                }
            })
            .catch(err => {
                console.log(err)
                // bot.postMessageToChannel('general', 'Error :feelsbadman: ' + err)
            })
        }
    })
})

bot.on('error', (err) => {
    console.log(err)
})

function flagUp() {

    PythonShell.run('flagup.py', {scriptPath: '/home/pi/flackbot'}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log('finished script')  
        }
    })

    // gpio.setup(rpi_pin, gpio.DIR_OUT, write)
    // write()
}
function flagDown() {

    PythonShell.run('flagdown.py', {scriptPath: '/home/pi/flackbot'}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log('finished script')  
        }
    })

    // gpio.setup(rpi_pin, gpio.DIR_OUT, write)
    // write()
}

// function write() {
//     console.log('writing')
//     gpio.write(rpi_pin, true, (err) => {
//         if(err) throw err
//         console.log('written to pin')
//     })
// }