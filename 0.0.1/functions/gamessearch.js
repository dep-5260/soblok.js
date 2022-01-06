const fetch = require('node-fetch')
module.exports = async(key, y) => {
if(!key) return new Error(`Key is not defined.`);
let max;

if(!y) {
    console.log('[SOBLOK] The max filter was undefined so we set it to 25!')
    max = 25
} else {
    max = y;
}
let output = {array: []}
await fetch(`https://games.roblox.com/v1/games/list?keyword=${key}&startRows=0&maxRows=${max}&hasMoreRows=true&isKeywordSuggestionEnabled=true`).then(i=>i.json()).then(l=>{
l.games.forEach(game => {
    output.array.push({
        creator: {
            id: game.creatorId,
            name: game.creatorName,
            type: game.creatorType
        },
        votes: {
            down: game.totalDownVotes,
            up: game.totalUpVotes
        },
        universeId: game.universeId,
        placeId: game.placeId,
        playerCount: game.playerCount,
        name: game.name,
        description: game.gameDescription,
        genre: game.genre
    })
})
})

return output.array;
}