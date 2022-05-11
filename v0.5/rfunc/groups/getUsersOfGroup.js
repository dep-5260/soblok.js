let fetch = require('node-fetch');

function getUsers(group, sort, limit) {
    return fetch(`https://groups.roblox.com/v1/groups/${group}/users?sortOrder=${sort}&limit=${limit}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://groups.roblox.com/v1/groups/${group}/users?sortOrder=${sort}&limit=${limit}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            return fetch(`https://groups.roblox.com/v1/groups/${group}/users?sortOrder=${sort}&limit=${limit}`).then(n=>n.json()).then(body => {
                throw new Error(`${res.status} | Please read the RBLX Groups API https://groups.roblox.com/docs#!/Membership/get_v1_groups_groupId_users`)
            })
        }
    })
};

module.exports = (group, sort, limit) => {
    if(!group || !sort || !limit) {
        throw new Error('One or part of or all of the required arguments to run this wasn\'t specified yet.')
    };
    if(isNaN(group)) {
        throw new Error('The argument "group" needs to be a number.')
    }
    if(isNaN(limit)) {
        throw new Error('The argument "limit" needs to be a number.')
    }
    if(!sort.toLowerCase() === "Asc" || !sort.toLowerCase() === "Desc") {
        throw new Error('The argument "sort" needs to be a string "Asc" or "Desc". "Asc" for ascending, "Desc" for descending.')
    };
    return getUsers(group, sort, limit)
}