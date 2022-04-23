import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
    ignoreHeaders: true,
}

const client = applyCaseMiddleware(
    axios.create({
        baseURL: 'https://pure-taiga-32798.herokuapp.com',
    }),
    options
);

export default client;