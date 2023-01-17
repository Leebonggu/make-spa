import { ACCESS_KEY } from './env.js';

const BASE_URL = 'http://43.201.103.199/';

const ROUTES = {
	HOME: '/',
	UPLOAD: '/upload',
	POST: '/post/269',
	EDIT: '/edit/:postId',
};

const IMAGE_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}`;

export { BASE_URL, ROUTES, IMAGE_URL };
