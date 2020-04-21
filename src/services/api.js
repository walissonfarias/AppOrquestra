import axios from 'axios';

const baseURL = 'https://orquestraouropreto.herokuapp.com';

export default axios.create({baseURL});
