import axios from 'axios'

export default axios.create({
    baseURL: 'https://chafamon-web-api.azurewebsites.net/api/v1',
    headers: { 'Content-type': 'application/json' }
})