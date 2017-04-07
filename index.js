const SlackBot = require('slackbots')
const config = require('./config')
const gpio = require('rpi-gpio')
const rpi_pin = 7

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
                if(message === 'flag up') {
                    console.log('executing flag command')
                    flagUp()
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
    gpio.setup(rpi_pin, gpio.DIR_OUT, write)
    write()
}

function write() {
    console.log('writing')
    gpio.write(rpi_pin, true, (err) => {
        if(err) throw err
        console.log('written to pin')
    })
}