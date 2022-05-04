import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://subsc-manager-api.herokuapp.com',
    // withCredentials: true,
  }),

  options
);

export default client;