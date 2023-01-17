const BASE_URL = 'http://43.201.103.199/';

const ROUTES = {
	HOME: '/',
	UPLOAD: '/upload',
	POST: '/post/269',
	EDIT: '/edit/:postId',
};

const ACCESS_KEY = 'cl6h-r3s_mgyE6pHW1aXKb5ievPDsCnm6_8x2KnqB_g';
const SECRET_KEY = 'OwueTfuL2kKVQbz2ixIquwZGfK973m4a3FAmUTKMWNI';

const IMAGE_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}`;

export { BASE_URL, ROUTES, ACCESS_KEY, SECRET_KEY, IMAGE_URL };
