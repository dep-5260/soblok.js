let fetch = require('node-fetch');

function getBadges(user) {
    return fetch(`https://accountinformation.roblox.com/v1/users/${user}/roblox-badges`).then(res => {
        if(res.status === 200) {
            return fetch(`https://accountinformation.roblox.com/v1/users/${user}/roblox-badges`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error('The user never existed.')
        }
    })
};

module.exports = (user) => {
    if(!user) {
        throw new Error('You haven\'t specified the user argument yet')
    }
    if(isNaN(user)) {
        return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(res => {
            if(res.status === 200) {
                return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(n=>n.json()).then(body=>{
                    return getBadges(body.Id)
                })
            } else {
                throw new Error('The user never existed.')
            }
        })
    } else {
        return getBadges(user)
    }
}