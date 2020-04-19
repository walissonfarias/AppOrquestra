import axios from 'axios';

const baseURL = 'https://orquestra-backend-staging.herokuapp.com/';

export default axios.create({baseURL});
