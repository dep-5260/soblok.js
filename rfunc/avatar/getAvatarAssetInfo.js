let fetch = require('node-fetch');

function getAsset(asset) {
    return fetch(`https://api.roblox.com/marketplace/productinfo?assetId=${asset}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://api.roblox.com/marketplace/productinfo?assetId=${asset}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error('Avatar asset ID invalid or never existed.')
        }
    })
}

module.exports = (asset) => {
    if(!asset) {
        throw new Error('You haven\'t specified the Asset ID yet.')
    }
    if(isNaN(asset)) {
        throw new Error('The Asset ID that you specified wasn\'t a number')
    }
    return getAsset(asset)
}