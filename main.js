let version = "0.3.0"
let fetch = require('node-fetch');

// script

function check(ve) {
    console.log('Checking for latest soblok package version...')
    return fetch('https://soblok.depdev.repl.co').then(res => {
        if(res.status === 200) {
            return fetch(`https://soblok.depdev.repl.co`).then(n=>n.text()).then(body => {
                if(version === body) {
                    return console.log('Your soblok package is on the latest version!')
                } else {
                    return console.log('Your soblok package is out of date! Please install the latest version.')
                }
            })
        } else {
            throw new Error('Unable to check the version. [Error: Unable to Fetch LatestVersion]')
        }
    })
}

module.exports = {
    version: version,
    checkVersion: check,
    getBadgeInfo: require('./rfunc/badges/getBadgeInfo.js'),
    getPlayerInfo: require('./rfunc/users/getPlayerInfo.js'),
    getGroupInfo: require('./rfunc/groups/getGroupInfo.js'),
    getAvatar: require('./rfunc/users/getAvatar.js'),
    getUserRBLXBadges: require('./rfunc/badges/getUserRBLXBadges.js'),
    getUserPlayerBadges: require('./rfunc/badges/getUserPlayerBadges.js'),
    getUsersOfGroup: require('./rfunc/groups/getUsersOfGroup.js'),
    getUserFriends: require('./rfunc/users/getUserFriends.js'),
    getUserFollowers: require('./rfunc/users/getUserFollowers.js'),
    getUserFollowings: require('./rfunc/users/getUserFollowings.js'),
    getAvatarAssetInfo: require('./rfunc/avatar/getAvatarAssetInfo.js'),
    getAvatarThumbnail: require('./rfunc/avatar/getAvatarThumbnail.js'),
    checkRobloxStatus: require('./rfunc/robloxStatus.js'),
    searchGames: require('./rfunc/games/searchGames.js'),
    useless: {
        fetch: require('./rfunc/fetch.js')
    }
};

// This is where the package check it's own version

fetch(`https://soblok.depdev.repl.co`).then(res=>res.text()).then(data => {
    if(!data) return console.log('[Soblok - Version Manager]: Failed to fetch the latest soblok version.');
    if(version === data) return;
    console.log('[Soblok - Version Manager]: Please update your soblok package. ' + `Your version: ${version} and Lastest version: ${data} . Type "npm install soblok@latest" in shell/bash`)
    throw new Error('[Soblok - Version Manager]: Please update your soblok package. ' + `Your version: ${version} and Lastest version: ${data} . Type "npm install soblok@latest" in shell/bash`)
})