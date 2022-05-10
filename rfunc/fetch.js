let fetch = require('node-fetch');

function fetchText(url) {
    return fetch(`${url}`).then(res => {
        if(res.status === 200) {
            return fetch(`${url}`).then(n=>n.text()).then(body => {
                return body
            })
        } else {
            throw new Error(`[Soblok - Customized Fetch]: The page didn't return a 200 status code. It returned ${res.status}.`)
        }
    }).catch(err => {
        throw new Error(`[Soblok - Customized Fetch]: ${err}`)
    })
};

function fetchJson(url) {
    return fetch(`${url}`).then(res => {
        if(res.status === 200) {
            return fetch(`${url}`).then(n=>n.json()).then(body => {
                return body
            })
        } else {
            throw new Error(`[Soblok - Customized Fetch]: The page didn't return a 200 status code. It returned ${res.status}.`)
        }
    }).catch(err => {
        throw new Error(`[Soblok - Customized Fetch]: ${err}`)
    })
};

function justFetch(url) {
    return fetch(`${url}`).then(res => {
        return res
    }).catch(err => {
        throw new Error(`[Soblok - Customized Fetch]: ${err}`)
    })
};

module.exports = (url, options) => {
    if(!url) {
        throw new Error(`No URL was specified to fetch.`)
    }
    if(!options) return justFetch(url);
    if(options.mode.toLowerCase() === "text") {
        return fetchText(url)
    } else if(options.mode.toLowerCase() === "json") {
        return fetchJson(url)
    } else {
        return justFetch(url)
    }
}