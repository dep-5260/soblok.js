let fetch = require('node-fetch');

function getBadgeInfo(badgeId) {
    return fetch(`https://badges.roblox.com/v1/badges/${badgeId}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://badges.roblox.com/v1/badges/${badgeId}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error("Badge not found or never existed")
        }
    })
};

module.exports = (args) => {
    if(!args || isNaN(args)) {
        throw new Error('The Badge ID that you provided didn\'t exist or wasn\'t a number.')
    }
    return getBadgeInfo(args)
}