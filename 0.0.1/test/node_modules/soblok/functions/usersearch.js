const fetch = require('node-fetch');

module.exports = async(key, limit) => {
if(!key) return new Error("key is not defined");
if(!limit) return new Error("limit is not defined")

if(4 > key.length) return new Error("keyword was too short");
fetch(`https://users.roblox.com/v1/users/search?keyword=${key}&limit=${limit}`).then(i=>i.json()).then(a=>{
let output = {array: []};

a.data.forEach(user => {
    fetch(`https://users.roblox.com/v1/users/${user.id}`).then(i=>i.json()).then(b => {
    output.array.push({
        previousNames: user.previousNames,
        id: user.id,
        name: user.name,
        displayName: user.displayName,
        description: b.description,
        created: b.created,
        isBanned: b.isBanned
    })
})
})
})
}