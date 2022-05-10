let fetch = require('node-fetch');

function check(ve) {
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