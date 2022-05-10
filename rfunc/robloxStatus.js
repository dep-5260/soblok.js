let fetch = require('node-fetch');

function checkRBLXStatus() {
    return fetch(`http://hostedstatus.com/1.0/status/59db90dbcdeb2f04dadcf16d`).then(res => {
        if(res.status === 200) {
            return fetch(`http://hostedstatus.com/1.0/status/59db90dbcdeb2f04dadcf16d`).then(n=>n.json()).then(body => {
                let output = body.result.status_overall;
                output.apiUrl = {
                    host: 'status.io',
                    url: 'http://hostedstatus.com/1.0/status/59db90dbcdeb2f04dadcf16d'
                }
                return output
            })
        } else {
            throw new Error('Roblox Status API returned an error. Code : ' + res.status)
        }
    })
};

module.exports = checkRBLXStatus;