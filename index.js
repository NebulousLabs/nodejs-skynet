const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const DefaultUploadOptions = {
    portalUrl: "https://siasky.net",
    portalUploadPath: "/skynet/skyfile",
    portalFileFieldname: "file",
    customFilename: "",
}

const DefaultDownloadOptions = {
    portalUrl: "https://siasky.net"
}

function UploadFile(path, opts) {
    const options = opts.customFilename ? { filename: opts.customFilename } : {}

    const formData = new FormData();
    formData.append(opts.portalFileFieldname, fs.createReadStream(path), options);

    const uuid = generateUUID()
    const url = `${trimTrailingSlash(opts.portalUrl)}${trimTrailingSlash(opts.portalUploadPath)}/${uuid}`

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

function generateUUID() {
    let uuid = ''
    const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        uuid += cs.charAt(Math.floor(Math.random() * cs.length));
    }
    return uuid;
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
    DownloadFile: DownloadFile,
}