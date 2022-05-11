let fetch = require('node-fetch');

function getFriends(user) {
    return fetch(`https://friends.roblox.com/v1/users/${user}/friends`).then(res => {
        if(res.status === 200) {
            return fetch(`https://friends.roblox.com/v1/users/${user}/friends`).then(n=>n.json()).then(body => {
                let output = {friendsCount: body.data.length, friends: body.data};
                return output
            })
        } else {
            throw new Error('The user never existed.')
        }
    })
};

module.exports = (user) => {
    if(!user) {
        throw new Error('You haven\'t specified the user argument yet')
    };
    if(isNaN(user)) {
        return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(res => {
            if(res.status === 200) {
                return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(n=>n.json()).then(body=>{
                    return getFriends(body.Id)
                })
            } else {
                throw new Error('The user never existed.')
            }
        })
    } else {
        return getFriends(user)
    }
}