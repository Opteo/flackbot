const SlackBot = require('slackbots')
const config = require('./config')

const bot = new SlackBot({
    token: config.token,
    name: config.name
})

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    const params = {
        icon_emoji: ':cat:'
    };

    bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
        console.log(data);
    });
});
