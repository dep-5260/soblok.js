let fetch = require('node-fetch');

function getBadges(user, sort, limit) {
    return fetch(`https://badges.roblox.com/v1/users/${user}/badges?limit=${limit}&sortOrder=${sort}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://badges.roblox.com/v1/users/${user}/badges?limit=${limit}&sortOrder=${sort}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            return fetch(`https://badges.roblox.com/v1/users/${user}/badges?limit=${limit}&sortOrder=${sort}`).then(n=>n.text()).then(body => {
                throw new Error(`${res.status} | ${body} | Please read the RBLX Badges API https://badges.roblox.com/docs#!/Badges/get_v1_users_userId_badges`)
            })
        }
    })
};

module.exports = (user, sort, limit) => {
    if(!user || !sort || !limit) {
        throw new Error('One or part of or all of the required arguments to run this wasn\'t specified yet.')
    };
    if(isNaN(user)) {
        throw new Error('The argument "user" needs to be a number.')
    }
    if(isNaN(limit)) {
        throw new Error('The argument "limit" needs to be a number.')
    }
    if(!sort.toLowerCase() === "Asc" || !sort.toLowerCase() === "Desc") {
        throw new Error('The argument "sort" needs to be a string "Asc" or "Desc". "Asc" for ascending, "Desc" for descending.')
    }
    return getBadges(user, sort, limit)
}