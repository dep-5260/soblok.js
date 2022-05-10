let fetch = require('node-fetch');

function getAvatarThumbnail(user) {
    return fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user}&size=720x720&format=Png&isCircular=true`).then(res => {
        if(res.status === 200) {
            return fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user}&size=720x720&format=Png&isCircular=true`).then(n=>n.json()).then(body =>{
                return body
            })
        } else {
            throw new Error('User is invalid or never existed.')
        }
    })
}

module.exports = (user) => {
    if(!user) {
        throw new Error('You haven\'t specified the user argument yet')
    }
    if(isNaN(user)) {
        return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(res => {
            if(res.status === 200) {
                return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(n=>n.json()).then(body=>{
                    return getAvatarThumbnail(body.Id)
                })
            } else {
                throw new Error('The user never existed.')
            }
        })
    } else {
        return getAvatarThumbnail(user)
    }
}