'use strict'

const p = require('path')
const fs = require('fs')

function walkDirectory(path, out) {
    let files = []
    if (!fs.existsSync(path)) {
        return files;
    }

    for (const subpath of fs.readdirSync(path)) {
        const fullpath = p.join(path, subpath)
        if (fs.statSync(fullpath).isDirectory()) {
            files = files.concat(walkDirectory(fullpath, out))
            continue
        }
        files.push(fullpath)
    }
    return files
}

function trimSiaPrefix(str) {
    return str.replace("sia://", "")
}

function trimTrailingSlash(str) {
    return str.replace(/\/$/, "");
}

module.exports = { walkDirectory, trimSiaPrefix, trimTrailingSlash }
