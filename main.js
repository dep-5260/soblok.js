let version = "0.1"
let fetch = require('node-fetch');

module.exports = {
    version: version,
    getBadgeInfo: require('./rfunc/badges/getBadgeInfo.js'),
    getPlayerInfo: require('./rfunc/users/getPlayerInfo.js'),
    getAvatar: require('./rfunc/users/getAvatar.js'),
    getUsersOfGroup: require('./rfunc/groups/getUsersOfGroup.js'),
    getUserFriends: require('./rfunc/users/getUserFriends.js'),
    getUserFollowers: require('./rfunc/users/getUserFollowers.js'),
    getUserFollowings: require('./rfunc/users/getUserFollowings.js'),
    getAvatarAssetInfo: require('./rfunc/avatar/getAvatarAssetInfo.js'),
    getAvatarThumbnail: require('./rfunc/avatar/getAvatarThumbnail.js'),
    checkRobloxStatus: require('./rfunc/robloxStatus.js'),
    searchGames: require('./rfunc/games/searchGames.js')
};

// This is where the package check it's own version

fetch(`https://soblok.depdev.repl.co`).then(res=>res.text()).then(data => {
    if(!data) return console.log('[Soblok - Version Manager]: Failed to fetch the latest soblok version.');
    if(version === data) return;
    console.log('[Soblok - Version Manager]: Please update your soblok package. ' + `Your version: ${version} and Lastest version: ${data} . Type "npm install soblok@latest" in shell/bash`)
    throw new Error('[Soblok - Version Manager]: Please update your soblok package. ' + `Your version: ${version} and Lastest version: ${data} . Type "npm install soblok@latest" in shell/bash`)
})