let fetch = require('node-fetch');

function getInfo(group) {
    return fetch(`https://groups.roblox.com/v1/groups/${group}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://groups.roblox.com/v1/groups/${group}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error('Group never existed.')
        }
    })
}

module.exports = (groupID) => {
    if(!groupID) {
        throw new Error('You haven\'t specified the group ID yet.')
    }
    if(isNaN(groupID)) {
        throw new Error('The group ID must be a number.')
    }
    return getInfo(groupID)
}