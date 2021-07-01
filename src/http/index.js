import axios from 'axios'

const $axios = axios.create({
    headers: {
        'User-Agent': 'request'
    }
})

export default $axios