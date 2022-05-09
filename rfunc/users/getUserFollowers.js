let fetch = require('node-fetch');

function getFollowers(user, limit, sort) {
    return fetch(`https://friends.roblox.com/v1/users/${user}/followers?limit=${limit}&sortOrder=${sort}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://friends.roblox.com/v1/users/${user}/followers?limit=${limit}&sortOrder=${sort}`).then(n=>n.json()).then(body => {
                let output = {followersCount: body.data.length, followers: body.data};
                return output 
            })
        } else {
            throw new Error('The user never existed.')
        }
    })
};

module.exports = (user, sort, limit) => {
    if(!user || !sort || !limit) {
        throw new Error('One or part of or all of the required arguments to run this wasn\'t specified yet.')
    };
    if(isNaN(limit)) {
        throw new Error('The argument "limit" needs to be a number.')
    }
    if(!sort.toLowerCase() === "Asc" || !sort.toLowerCase() === "Desc") {
        throw new Error('The argument "sort" needs to be a string "Asc" or "Desc". "Asc" for ascending, "Desc" for descending.')
    };
    if(isNaN(user)) {
        return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(res => {
            if(res.status === 200) {
                return fetch(`https://api.roblox.com/users/get-by-username?username=${user}`).then(n=>n.json()).then(body=>{
                    return getFollowers(body.Id, limit, sort)
                })
            } else {
                throw new Error('The user never existed.')
            }
        })
    } else {
        return getFollowers(user, limit, sort)
    }
}