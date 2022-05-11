let fetch = require('node-fetch');

function getAvatar(user) {
    return fetch(`https://avatar.roblox.com/v1/users/${user}/avatar`).then(res => {
        if(res.status === 200) {
            return fetch(`https://avatar.roblox.com/v1/users/${user}/avatar`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error('The user never existed.')
        }
    })
};

module.exports = (userID) => {
    if(!userID || isNaN(userID)) {
        throw new Error('You haven\'t specified any user ID or it was specified but it wasn\'t a number.')
    }
    return getAvatar(userID)
}