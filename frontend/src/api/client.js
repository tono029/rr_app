import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true,
}

// applyCaseMiddleware必要？
const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://subsc-manager-api.herokuapp.com',
  }),
  options
);

export default client;