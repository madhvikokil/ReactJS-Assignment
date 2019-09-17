// instance of axios file
import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-my-burger-1d23a.firebaseio.com/'
})

export default instance;