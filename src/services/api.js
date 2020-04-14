import axios from 'axios'

const url = 'orquestraouropreto.herokuapp.com/'
const baseURL = `http://${url}`

export default axios.create({ baseURL })