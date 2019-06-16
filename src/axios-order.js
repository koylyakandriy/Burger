import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-38bde.firebaseio.com/',
});

export default instance;
