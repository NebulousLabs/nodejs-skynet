const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const DefaultUploadOptions = {
    portalUrl: "https://siasky.net/",
    portalUploadPath: "/api/skyfile",
    portalFileFieldname: "file",
    customFilename: "",
}

const DefaultDownloadOptions = {
    portalUrl: "https://siasky.net/"
}

function UploadFile(path, opts) {
    const options = opts.customFilename ? { filename: opts.customFilename } : {}

    const formData = new FormData();
    formData.append(opts.portalFileFieldname, fs.createReadStream(path), options);

    const url = `${trimTrailingSlash(opts.portalUrl)}/${opts.portalUploadPath}`

    return new Promise((resolve, reject) => {
        axios.post(url, formData, { headers: formData.getHeaders() })
            .then(resp => {
                resolve(resp.data.skylink)
            }).catch(error => {
                reject(error)
            })
    })
}

function DownloadFile(path, skylink, opts) {
    const url = `${trimTrailingSlash(opts.portalUrl)}/${skylink}`

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

function trimTrailingSlash(str) {
    return str.replace(/\/$/, "");
}

module.exports = {
    DefaultUploadOptions: DefaultUploadOptions,
    DefaultDownloadOptions: DefaultDownloadOptions,
    UploadFile: UploadFile,
    DownloadFile: DownloadFile,
}