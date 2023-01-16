const BASE_URL = 'http://43.201.103.199/';

const ROUTES = {
	HOME: '/',
	UPLOAD: '/upload',
	POST: (id = '') => `/post${id ? `/${id}` : ''}`,
	EDIT: (id = '') => `/edit${id ? `/${id}` : ''}`,
};

export { BASE_URL, ROUTES };
