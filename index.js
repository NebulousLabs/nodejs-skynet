const p = require('path')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const DefaultUploadOptions = {
    portalUrl: "https://siasky.net",
    portalUploadPath: "/skynet/skyfile",
    portalFileFieldname: "file",
    portalDirectoryFileFieldname: "files[]",
    customFilename: "",
}

const DefaultDownloadOptions = {
    portalUrl: "https://siasky.net"
}

function UploadFile(path, opts) {
    const options = opts.customFilename ? { filename: opts.customFilename } : {}

    const formData = new FormData();
    formData.append(opts.portalFileFieldname, fs.createReadStream(path), options);

    const url = `${trimTrailingSlash(opts.portalUrl)}${trimTrailingSlash(opts.portalUploadPath)}`

    return new Promise((resolve, reject) => {
        axios.post(url, formData, { headers: formData.getHeaders() })
            .then(resp => {
                resolve(`sia://${resp.data.skylink}`)
            }).catch(error => {
                reject(error)
            })
    })
}

function UploadDirectory(path, opts) {
    const stat = fs.statSync(path)
    if (!stat.isDirectory()) {
        throw new Error(`Given path is not a directory: ${path}`)
    }

    const formData = new FormData();
    for (const file of walkDirectory(path)) {
        formData.append(opts.portalDirectoryFileFieldname, fs.createReadStream(file), { filepath: file });
    }

    const url = `${trimTrailingSlash(opts.portalUrl)}${trimTrailingSlash(opts.portalUploadPath)}?filename=${opts.customFilename || path}`

    return new Promise((resolve, reject) => {
        axios.post(url, formData, { headers: formData.getHeaders() })
            .then(resp => {
                resolve(`sia://${resp.data.skylink}`)
            }).catch(error => {
                reject(error)
            })
    })
}

function DownloadFile(path, skylink, opts) {
    const url = `${trimTrailingSlash(opts.portalUrl)}/${trimSiaPrefix(skylink)}`

    const writer = fs.createWriteStream(path)

    return new Promise((resolve, reject) => {
        axios.get(url, { responseType: 'stream' })
            .then(response => {
                response.data.pipe(writer)
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
            .catch(error => {
                reject(error)
            })
    })
}

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

module.exports = {
    DefaultUploadOptions: DefaultUploadOptions,
    DefaultDownloadOptions: DefaultDownloadOptions,
    UploadFile: UploadFile,
    UploadDirectory: UploadDirectory,
    DownloadFile: DownloadFile,
}