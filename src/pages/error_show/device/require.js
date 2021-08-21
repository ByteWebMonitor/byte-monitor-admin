const axios = require('axios').default;

// const baseURL = 'http://127.0.0.1:9999/api'
const baseURL = 'https://qcgtsp.app.cloudendpoint.cn/api'

const request = axios.create({
    baseURL: baseURL
})

module.exports = request