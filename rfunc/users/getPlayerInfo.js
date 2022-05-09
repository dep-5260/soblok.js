let fetch = require('node-fetch');

function getPlayerInfoByID(args) {
    return fetch(`https://users.roblox.com/v1/users/${args}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://users.roblox.com/v1/users/${args}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error('The user never existed.')
        }
    })
};

module.exports = (user) => {
    if(!user) {
        throw new Error('You haven\'t specified a username or a user\'s ID yet.')
    }
    if(isNaN(user)) {
        return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(res => {
            if(res.status === 200) {
                return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(n=>n.json()).then(body=>{
                    return getPlayerInfoByID(body.Id)
                })
            } else {
                throw new Error('The user never existed.')
            }
        })
    } else {
        return getPlayerInfoByID(user)
    }
}