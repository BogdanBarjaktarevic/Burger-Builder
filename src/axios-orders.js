import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6b270.firebaseio.com/'
})

export default instance;