let fetch = require('node-fetch');

function searchGames(args) {
    return fetch(`https://games.roblox.com/v1/games/list?keyword=${args}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://games.roblox.com/v1/games/list?keyword=${args}`).then(n=>n.json()).then(body => {
                return body.games
            })
        } else {
            throw new Error('There was an error when fetching roblox servers. Request status code : ' + res.status)
        }
    })
};

module.exports = (args) => {
    if(!args) {
        throw new Error('Arguments for the game name needs to be specified')
    }
    return searchGames(args)
}